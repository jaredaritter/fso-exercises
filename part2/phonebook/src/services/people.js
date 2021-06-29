import axios from 'axios';

// PHONEBOOK-BACKEND
// const baseUrl = 'http://localhost:3001/api/persons';

// JSON SERVER
// const baseUrl = 'http://localhost:3001/people';

// RELATIVE BASEURL FOR BUILD BEING SERVED BY BACKEND
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const peopleService = {
  getAll,
  create,
  update,
  remove,
};

export default peopleService;
