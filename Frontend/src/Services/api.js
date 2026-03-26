const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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
