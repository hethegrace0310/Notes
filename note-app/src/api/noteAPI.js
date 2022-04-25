const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const backendURL = "http://localhost:5005";

// GET: /notes
export const getNotesAPI = () => {
  return fetch(`${backendURL}/api/notes`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

// POST: /notes
// export const createNoteAPI = (textTitle, text, tags, writer) => {
export const createNoteAPI = (textTitle, text, tags) => {
  return fetch(`${backendURL}/api/notes`, {
    //${backendURL}/api/notes`로 post 요청 날리는거임
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({ textTitle, text, tags }),
    // body: JSON.stringify({ textTitle, text, tags, writer }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

// PUT: /notes/:id
export const updateNoteAPI = (note) => {
  return fetch(`${backendURL}/api/notes/${note._id}`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(note),
  }).then(checkStatus);
};

//DELETE: /notes/:id
export const deleteNoteAPI = (id) => {
  return fetch(`${backendURL}/api/notes/${id}`, {
    ...defaultHeaders,
    method: "DELETE",
  })
    .then(checkStatus)
    .then(parseJSON);
};

function checkStatus(response) {
  console.log(response);
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
  console.log(response);
  return response.json(); //response중에 json 응답만 걸러준다.
}
