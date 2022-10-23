import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import { jwtHelper } from 'helpers';
async function createUserByCredentials(req: NextApiRequest, res: NextApiResponse) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
      //Getting email and password from body
      const { login, password } = req.body;
      //Validate
      if (!login || !password) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }
      //Connect with database
      const client = await MongoClient.connect(process.env.MONGODB_URI as string);
      const db = client.db();
      //Check existing
      const checkExisting = await db
          .collection('users')
          .findOne({ login });
      //Send error response if duplicate user is found
      if (checkExisting) {
          res.status(422).json({ message: 'User already exists' });
          client.close();
          return;
      }
      //Hash password
      const status = await db.collection('users').insertOne({
          login,
          password: await hash(password, 12),
          words: [],
      });
      const user = await db.collection('users').findOne({
        _id: status.insertedId
      })
      
      const token = await jwtHelper(user.login, user.password, process.env.SECRET as string);
      //Send success response
      res.status(200).json({ message: 'User created', token });
      //Close DB connection
      client.close();
  } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default createUserByCredentials;