import { NextApiRequest, NextApiResponse } from 'next';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

async function getUserWords(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { token } = req.body;
      if (!token) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }
      try {
        const params = JWT.verify(token, process.env.SECRET as string) as JwtPayload;
        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        const db = client.db();
        const user = await db.collection('users').findOne({
            login: params.l,
            password: params.p,
        });
        
        if (user) {
          const words = await db.collection('words').find({
            _id: { $in: user.words }
          }).toArray()
          
          client.close();
          res.status(200).json({
            words: words.map(word => ({
              id: word._id.toString(),
              ru: word.ru,
              de: word.de,
            }))
          });

          return;
        } else {
          res.status(400).json({ message: 'Error occupied' });
        }

      } catch(err) {
        res.status(400).json({ message: 'Error occupied' });
        return;
      }

  } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default getUserWords;