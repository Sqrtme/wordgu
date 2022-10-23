import JWT from 'jsonwebtoken';

const jwtHelper = (l: string, p: string, secret: string): Promise<string> => new Promise((resolve, reject) => {
  JWT.sign({ l, p }, secret, {}, (err, token) => {
    if (err) {
      return reject(err)
    }
    resolve(token as string);
  })
})

export { jwtHelper };