const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {auth} = require('./middleware/auth');
const {dbSetup} = require('./setup');

const {autocomplete} = require('./controllers/autocomplete');
const {login} = require('./controllers/login');
const {getAdminData} = require('./controllers/admin');
const {getEntry, listEntries, updateEntry, deleteEntry} = require('./controllers/entry');
const {createUser, updateUser, deleteUser} = require('./controllers/user');

dbSetup();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/autocomplete/:prefix', autocomplete);

app.post('/api/login', login);

app.use(auth);
app.get('/api/entry/:entryId', getEntry);
app.post('/api/entry/:entryId', updateEntry);
app.delete('/api/entry/:entryId', deleteEntry);
app.get('/api/entries', listEntries);

app.get('/api/admin',getAdminData);

app.get('/api/user/:userId', createUser);
app.post('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

app.listen(3001, () => console.log('Express server is running on localhost:3001'));

