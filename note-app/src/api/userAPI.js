const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};
const backendURL = "http://localhost:5005";
// POST: /register
// export const register = (name, email, password) => {
//   return fetch(`/api/register`, {
//     ...defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password,
//       password,
//     }),
//   }).then((response) => {
//     if (response.status >= 500) {
//       return "duplicated";
//     }
//     return "sucess";
//   });
// };
// POST: /login
// POST: /logout

// GET: /user
export const getUserAPI = () => {
  return fetch(`${backendURL}/api/user`, {
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
