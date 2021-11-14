import { getRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import authConfig from '../typeorm/config/authConfig';

export const login = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { email, password } = request.body;
    const userRepository = getRepository(User);
    console.log(password);
    const user = await userRepository.findOne({
      where: { email },
      select: ['password', 'id', 'name', 'email'],
    });

    if (!user) {
      return response.status(404).json({ error: 'Usuario não encontrado' });
    }

    // verifica se a senha esta correta
    if (!user.checkIfPasswordMatch(password)) {
      return response.status(401).json({ error: 'Senha incorreta' });
    }
    // const roles = user.roles.map(role => role.name);
    return response.status(202).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        subject: user.id,
        expiresIn: authConfig.expiresIn,
      }),
    });
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Alguma coisa deu errado ${error}` });
  }
};
