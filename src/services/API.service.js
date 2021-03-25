const CONFIG = require('../config/Config');

exports.login = async (hash) => {
  let response;
  try {
    response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response) return response.json();
  } catch (error) {
    throw error;
  }
};

