const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbraindb'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [{
    id: '123',
    name: 'Andrei',
    email: 'john@gmail.com',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'wghhh'
  }
}

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)} );

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)} );

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} );

app.put('/image',(req,res)=>{image.handleImage(req, res, db)} );

app.listen(3001, () => console.log('Example app running on port 3001!'))