import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../typeorm/config/authConfig';

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Acesso negado, precisas estar logado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, authConfig.secret);

    req.body.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalido' });
  }
}
