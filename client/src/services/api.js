const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const searchBuses = async (from, to, date) => {
  const params = new URLSearchParams({
    from,
    to,
    date,
  });

  const response = await fetch(`${API_URL}/buses/search?${params.toString()}`);

  return response.json();
};
