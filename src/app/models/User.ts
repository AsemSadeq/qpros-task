import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  password: string;
  email: string;
}

const userSchema = new Schema<UserDocument>({
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

userSchema.pre('save', async function (next) {
	const user = this as UserDocument;

	if (!user.isModified('password')) {
	  return next();
	}

	try {
	  const saltRounds = 10;
	  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

	  user.password = hashedPassword;
	  next();
	} catch (error) {
	  console.error('Error hashing password');
	}
});

const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
