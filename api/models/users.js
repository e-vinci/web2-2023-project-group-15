const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    firstname: 'admin',
    lastname: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin', saltRounds),
    address: "ville, rue, numero",
    birthdate: new Date(), // the month is 0-indexed
  },
];

async function login(email, password) {
  const userFound = readOneUserFromUsername(email);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username: email }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username: email,
    token,
  };

  return authenticatedUser;
}

async function register(firstname, lastname,email, password, address, birthdate ) {
  const userFound = readOneUserFromUsername(email);
  if (userFound) return undefined;
  await createOneUser(firstname, lastname, email, password, address, birthdate);

  const token = jwt.sign(
    { username: email }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username: email,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(email) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.email === email);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(firstname, lastname, email, password, address, birthdate) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const trueDate = new Date(birthdate)
  
  console.log(trueDate);
  const createdUser = {
    id: getNextId(),
    firstname: firstname,
    lastname, lastname,
    email: email,
    password: hashedPassword,
    address: address,
    birthdate:trueDate,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function getInfoByUserId(id) {
  const idNumber = parseInt(id, 10);
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUsersFound = users.findIndex((user) => user.id === idNumber);
  if (indexOfUsersFound < 0) return undefined;

  return users[indexOfUsersFound];
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  getInfoByUserId,
};
