const ADMIN_SESSION_KEY = "adminSession";

const getAdminSession = () => {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
};

const saveAdminSession = (session) => {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  localStorage.setItem("user", JSON.stringify(session.user));
};

const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem("user");
};

const isAdminAuthenticated = () => {
  const session = getAdminSession();
  return Boolean(session?.token && session?.user?.role === "admin");
};

export {
  ADMIN_SESSION_KEY,
  clearAdminSession,
  getAdminSession,
  isAdminAuthenticated,
  saveAdminSession,
};

