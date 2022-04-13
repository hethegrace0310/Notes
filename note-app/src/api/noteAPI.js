const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

// GET: /notes
export const getNotesAPI = () => {
  return fetch(`/api/notes`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

// POST: /notes
export const createNoteAPI = (textTitle, text, tags, writer) => {
  return fetch(`/api/notes`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({ textTitle, text, tags, writer }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

// PUT: /notes/:id
export const updateNoteAPI = (note) => {
  return fetch(`/api/notes/${note._id}`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(note),
  }).then(checkStatus);
};

//DELETE: /notes/:id
export const deleteNoteAPI = (id) => {
  return fetch(`/api/notes/${note._id}`, {
    ...defaultHeaders,
    method: "DELETE",
  })
    .then(checkStatus)
    .then(parseJSON);
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
