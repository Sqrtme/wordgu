import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';
import { jwtHelper } from 'helpers';

async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { login, password  } = req.body;
      const client = await MongoClient.connect(process.env.MONGODB_URI as string);
      const users = await client.db().collection('users');
      const result = await users.findOne({
        login: login,
      });
      //Not found - send error res
      if (!result) {
        client.close();
        throw new Error('No user found with the email');
      }
      //Check hased password with DB password
      const checkPassword = await compare(password, result.password);
      //Incorrect password - send response
      if (!checkPassword) {
        client.close();
        res.status(422).json({ message: 'Invalid Data' });
        return;
      }
      
      const token = await jwtHelper(login, result.password, process.env.SECRET as string);
      res.status(200).json({ token });
  } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default login;