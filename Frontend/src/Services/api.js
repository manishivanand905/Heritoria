const DEFAULT_LOCAL_API_URL = "http://localhost:5000/api";
const DEFAULT_PRODUCTION_API_URL = "https://heritoria.onrender.com/api";

const normalizeBaseUrl = (url) => {
  const trimmedUrl = url.replace(/\/+$/, "");
  return trimmedUrl.endsWith("/api") ? trimmedUrl : `${trimmedUrl}/api`;
};

const isLocalFrontend =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const API_BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_URL ||
    (isLocalFrontend ? DEFAULT_LOCAL_API_URL : DEFAULT_PRODUCTION_API_URL),
);

const getAdminToken = () => {
  try {
    const raw = localStorage.getItem("adminSession");
    if (!raw) {
      return "";
    }

    const session = JSON.parse(raw);
    return session?.token || "";
  } catch (error) {
    return "";
  }
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const requestJson = async (path, options = {}) => {
  const adminToken = getAdminToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: options.cache || "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null
        ? payload.message
        : "Request failed";
    throw new Error(message);
  }

  return payload;
};

export { API_BASE_URL, requestJson };
