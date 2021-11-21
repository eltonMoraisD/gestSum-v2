import { Request, Response, NextFunction } from 'express';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { getRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';

interface IPayload {
  id: string;
  iat: number;
  exp: number;
  sub: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization || '';
  const userRepository = getRepository(User);

  const [, token] = authHeader.split(' ');
  const payload: JwtPayload = jwtDecode<IPayload>(token);

  const user = await userRepository.findOne(payload?.sub, {
    relations: ['roles'],
  });

  return user;
}

function hasRole(role: string[]) {
  const authorisedRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(req);
    const userRoles = user?.roles.map(role => role.name);
    const rolesExist = userRoles?.some(r => role.includes(r));

    if (rolesExist) {
      return next();
    }
    return res.status(401).json({ message: 'Not authorized!' });
  };
  return authorisedRole;
}

export { hasRole };
