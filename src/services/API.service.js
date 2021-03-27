const CONFIG = require('../config/Config');

const {API_URL} = CONFIG;

exports.login = async (body) => {
  let response;
  try {
    response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) return response.json();
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (token) => {
  let response;
  try {
    response = await fetch(`${API_URL}/user/get`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) return response.json();
  } catch (error) {
    throw error
    
  }
}

exports.getAllTasks = async (id, token) => {
  let response;
  try {
    response = await fetch(`${API_URL}/task/getAllByUser?id=${id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) return response.json();
  } catch (error) {
    throw error
    
  }
}

exports.getAllTools = async (token) => {

  let response;
  try {
    response = await fetch(`${API_URL}/tool/getAllTools`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) return response.json();
  } catch (error) {
    throw error
    
  }

}



