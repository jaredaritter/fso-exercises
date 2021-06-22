const express = require('express');
const app = express();

app.use(express.json());

// persons
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

const isInPersons = (name) => {
  return persons.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ? true
    : false;
};

// routes
app.get('/info', (req, res) => {
  const personsLength = persons.length;
  res.send(
    `<p>Phonebook has info for ${personsLength} people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(404).send({ error: 'Name and number required' });
  }
  if (isInPersons(req.body.name)) {
    return res.status(404).send({ error: 'Name already in phonebook' });
  }
  const body = req.body;
  body.id = generateId();
  persons = persons.concat(body);
  res.send('Person posted');
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
