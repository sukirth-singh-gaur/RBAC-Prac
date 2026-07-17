// In-memory users store
// In production, replace this with a real database (MongoDB, PostgreSQL, etc.)
const users = [];

const findUserByEmail = (email) => users.find((u) => u.email === email);
const findUserById = (id) => users.find((u) => u.id === id);
const createUser = (user) => {
  users.push(user);
  return user;
};
const getAllUsers = () => users.map(({ password, ...user }) => user);
//NOTE : getAllUsers uses destructuring to drop the password before returning anything. Never send password fields in API responses, even hashed ones.
module.exports = { findUserByEmail, findUserById, createUser, getAllUsers };