import jwt from 'jsonwebtoken';

export const authenticateToken = ({ req }: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = (token.split(' ').pop() ?? '').trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '5hr' });
    req.user = data;
  } catch (err) {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = (_id: unknown) => {
  const payload = { _id };
  const secretKey: any = process.env.JWT_SECRET_KEY; 

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '5h' });
};
