const stripRupeeSymbols = (value = "") =>
  String(value)
    .replace(/\u20B9/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ensureCurrencyDisplay = (value = "") => {
  const normalizedValue = stripRupeeSymbols(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue.toLowerCase() === "included"
    ? "Included"
    : `₹${normalizedValue}`;
};

const ensurePriceRangeDisplay = (value = "") => {
  const normalizedValue = stripRupeeSymbols(value);

  if (!normalizedValue) {
    return "";
  }

  if (/onwards$/i.test(normalizedValue)) {
    const baseValue = normalizedValue.replace(/\s+onwards$/i, "").trim();
    return `₹${baseValue} onwards`;
  }

  const [fromValue, toValue] = normalizedValue.split(/\s*-\s*/).map((item) => item.trim());

  if (fromValue && toValue) {
    return `₹${fromValue} - ₹${toValue}`;
  }

  return `₹${normalizedValue}`;
};

export { ensureCurrencyDisplay, ensurePriceRangeDisplay };
