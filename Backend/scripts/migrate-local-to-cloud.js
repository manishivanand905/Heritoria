require("dotenv").config();

const dns = require("node:dns");
const { MongoClient } = require("mongodb");

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/heritoria";
const DEFAULT_DB_NAME = "heritoria";
const BATCH_SIZE = 200;

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || DEFAULT_LOCAL_URI;
const REMOTE_URI = process.env.MONGODB_URI;
const DNS_SERVERS = (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

const isLocalMongoUri = (uri = "") => /127\.0\.0\.1|localhost/i.test(uri);
const extractDbName = (uri = "") => {
  const withoutQuery = uri.split("?")[0];
  return withoutQuery.slice(withoutQuery.lastIndexOf("/") + 1);
};

const removeUndefined = (value) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  );

const buildIndexDefinition = (index) =>
  removeUndefined({
    key: index.key,
    name: index.name,
    unique: index.unique,
    sparse: index.sparse,
    expireAfterSeconds: index.expireAfterSeconds,
    partialFilterExpression: index.partialFilterExpression,
    collation: index.collation,
    weights: index.weights,
    default_language: index.default_language,
    language_override: index.language_override,
  });

const getUniqueIndexFilters = (indexes) =>
  indexes
    .filter((index) => index.unique && index.name !== "_id_")
    .map((index) => Object.keys(index.key));

const buildUpsertOperation = (document, uniqueIndexFilters) => {
  const matchingUniqueKeys = uniqueIndexFilters.find((keys) =>
    keys.every((key) => document[key] !== undefined),
  );

  if (!matchingUniqueKeys) {
    return {
      replaceOne: {
        filter: { _id: document._id },
        replacement: document,
        upsert: true,
      },
    };
  }

  const filter = Object.fromEntries(
    matchingUniqueKeys.map((key) => [key, document[key]]),
  );
  const { _id, ...documentWithoutId } = document;

  return {
    updateOne: {
      filter,
      update: {
        $set: documentWithoutId,
        $setOnInsert: { _id },
      },
      upsert: true,
    },
  };
};

const flushBatch = async (collection, documents, uniqueIndexFilters) => {
  if (!documents.length) {
    return 0;
  }

  await collection.bulkWrite(
    documents.map((document) => buildUpsertOperation(document, uniqueIndexFilters)),
    { ordered: false },
  );

  return documents.length;
};

const syncIndexes = async (sourceCollection, targetCollection) => {
  const sourceIndexes = await sourceCollection.indexes();
  const transferableIndexes = sourceIndexes
    .filter((index) => index.name !== "_id_")
    .map(buildIndexDefinition);

  if (!transferableIndexes.length) {
    return;
  }

  await targetCollection.createIndexes(transferableIndexes);
};

const migrateCollection = async (sourceDb, targetDb, name) => {
  const sourceCollection = sourceDb.collection(name);
  const targetCollection = targetDb.collection(name);
  const sourceCount = await sourceCollection.countDocuments();
  const sourceIndexes = await sourceCollection.indexes();
  const uniqueIndexFilters = getUniqueIndexFilters(sourceIndexes);

  console.log(`Migrating ${name} (${sourceCount} documents)...`);

  let migratedCount = 0;
  let batch = [];

  const cursor = sourceCollection.find({});

  while (await cursor.hasNext()) {
    const document = await cursor.next();
    batch.push(document);

    if (batch.length >= BATCH_SIZE) {
      migratedCount += await flushBatch(targetCollection, batch, uniqueIndexFilters);
      batch = [];
    }
  }

  migratedCount += await flushBatch(targetCollection, batch, uniqueIndexFilters);
  await syncIndexes(sourceCollection, targetCollection);

  const targetCount = await targetCollection.countDocuments();

  return {
    name,
    sourceCount,
    migratedCount,
    targetCount,
  };
};

const main = async () => {
  if (!REMOTE_URI) {
    throw new Error("MONGODB_URI is missing in Backend/.env");
  }

  if (isLocalMongoUri(REMOTE_URI)) {
    throw new Error(
      "MONGODB_URI still points to localhost. Update Backend/.env with the cloud MongoDB URI before migrating.",
    );
  }

  const localClient = new MongoClient(LOCAL_URI);
  const remoteClient = new MongoClient(REMOTE_URI);

  try {
    dns.setServers(DNS_SERVERS);
    await localClient.connect();
    await remoteClient.connect();

    const sourceDbName =
      process.env.LOCAL_MONGODB_DB_NAME || extractDbName(LOCAL_URI) || DEFAULT_DB_NAME;
    const targetDbName =
      process.env.MONGODB_DB_NAME || extractDbName(REMOTE_URI) || sourceDbName;
    const sourceDb = localClient.db(sourceDbName);
    const targetDb = remoteClient.db(targetDbName);
    const collections = await sourceDb.listCollections({}, { nameOnly: true }).toArray();
    const collectionNames = collections
      .map(({ name }) => name)
      .filter((name) => !name.startsWith("system."));

    if (!collectionNames.length) {
      console.log(`No collections found in local database "${sourceDb.databaseName}".`);
      return;
    }

    console.log(
      `Starting migration from "${sourceDb.databaseName}" to "${targetDb.databaseName}"...`,
    );

    const summary = [];

    for (const name of collectionNames) {
      const result = await migrateCollection(sourceDb, targetDb, name);
      summary.push(result);
      console.log(
        `Finished ${name}: migrated ${result.migratedCount}, target now has ${result.targetCount}.`,
      );
    }

    console.log("Migration summary:");
    for (const result of summary) {
      console.log(
        `- ${result.name}: source=${result.sourceCount}, migrated=${result.migratedCount}, target=${result.targetCount}`,
      );
    }
  } finally {
    await Promise.allSettled([localClient.close(), remoteClient.close()]);
  }
};

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
