import mongoose from 'mongoose'
import 'dotenv/config';

export const dbConnect = () => {

  const user = process.env.USER_DB;
  const password = process.env.PASSWD_DB;
  const uri = `mongodb+srv://${user}:${password}@cluster0.2kozwzv.mongodb.net/isdi?retryWrites=true&w=majority`
  return mongoose.connect(uri);
}
