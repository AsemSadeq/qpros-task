import UserModel from '../models/User';
import mongoose from 'mongoose';

const defaultUsers = [
	{
		email: 'test@gmail.com',
		password: '12345678',
	},
	{
		email: 'admin@gmail.com',
		password: '12345678',
	}
];

class Database {
	private static instance: Database;

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}

	public async connectDB(): Promise<void> {
		try {
			await mongoose.connect(process.env.MONGODB_URI as string);
			await Database.getInstance().seedDB();
		} catch (error) {
			console.error('Error connecting to MongoDB:', error);
		}
	}

	private async seedDB(): Promise<void> {
		try  {
			const user = await UserModel.findOne({}).limit(1);
			if (!user) {
				for (const key in defaultUsers) {
					const existingUser = await UserModel.findOne({ email: defaultUsers[key].email });
					if (existingUser) {
						console.error(`${defaultUsers[key].email} Email is already in use`);
				  	continue;
					}
					const newUser = new UserModel(defaultUsers[key]);
					await newUser.save();
				}
			}
		} catch (error) {
			console.error('Error Seed to MongoDB:', error);
		}
	}
}

export const connectDB = Database.getInstance().connectDB;