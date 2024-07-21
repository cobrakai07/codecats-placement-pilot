import User from "../models/user.model";

const getUserById = async (id: string | undefined) =>
  await User.findById(id).select("-password");
const getUserByEmail = async (email: string) =>
  await User.findOne({ email }).select("-password");
const checkUserCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  return user && (await user.matchPassword(password));
};
const createUser = async (email: string, username: string, password: string) =>
  await User.create({ email, username, password });
const updateUser = async (
  id: string,
  payload: { username: string; email: string }
) => await User.findByIdAndUpdate(id, { ...payload });
const deleteUser = async (id: string | undefined) =>
  await User.findByIdAndDelete(id);

export {
  getUserByEmail,
  getUserById,
  checkUserCredentials,
  createUser,
  updateUser,
  deleteUser,
};
