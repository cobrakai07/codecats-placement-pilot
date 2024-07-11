// import mongoose, { Document, Model, Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import { NextFunction } from "express";

// // Define an interface for the document
// interface IUser extends Document {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   createdAt: Date;
// }

// // Interface to define User model methods
// interface IUserModel extends Model<IUser> {}

// const userSchema = new Schema<IUser>(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // check password
// userSchema.methods.matchPassword = async function (
//   enteredPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// // generate password hash before saving user.
// userSchema.pre("save", async function (this: IUser, next: NextFunction) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const User = mongoose.model<IUser, IUserModel>("User", userSchema);

// export default User;

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  // Add statics here if needed
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Correct usage of pre middleware in TypeScript
userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
