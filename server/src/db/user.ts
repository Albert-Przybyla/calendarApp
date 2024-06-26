import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authenticaion: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    refreshToken: { type: String, select: false },
  },
  key: { type: String, required: false, select: false },
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const UserModule = mongoose.model("User", UserSchema);

export const getUsers = () => UserModule.find();
export const getUserByEmail = (email: string) => UserModule.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModule.findOne({ "authenticaion.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModule.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModule(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModule.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModule.findByIdAndUpdate(id, values);
