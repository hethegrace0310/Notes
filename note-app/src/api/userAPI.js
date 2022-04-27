const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};
// const backendURL = "http://localhost:5005";
const backendURL = "";
// POST: /register
export const registerAPI = (name, email, password) => {
  return fetch(`${backendURL}/api/register`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then((response) => {
    if (response.status >= 500) {
      return "duplicated";
    }
    return "sucess";
  });
};
// POST: /login
export const loginAPI = (email, password) => {
  return fetch(`${backendURL}/api/login`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
    }
  });
};

// POST: /logout
export const logoutAPI = (name, email, password) => {
  return fetch(`${backendURL}/api/logout`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkStatus);
};

// GET: /user
export const getUserAPI = () => {
  return fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

// GER: /user/currentuser
export const getCurrentUserAPI = (id) => {
  return fetch(`${backendURL}/api/user/${id}`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

// PUT: /user
export const updateUserAPI = (user) => {
  return fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(user),
  }).then(checkStatus);
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
