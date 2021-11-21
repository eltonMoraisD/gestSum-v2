import { getRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { Request, Response } from 'express';
import { Role } from '../typeorm/entities/Role';

//TODO -> listar user by id,

interface IUser {
  name: string;
  email: string;
  password: string;
  roles: string[];
  teacherProfileId: any;
}

export const GetAllUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find({
      relations: ['roles', 'roles.permission'],
      select: ['id', 'name', 'email'],
    });

      
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetUser = async( req: Request, res: Response): Promise<Response> => {
  const {id} = req.params;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({where: {id},  relations: ['roles', 'roles.permission']})

    

    if(!user){
      return res.status(404).json({error: "Usuario não encontrado"})
    }

    res.json(user)
    
  } catch (error) {
    
  }
}

export const CreateUser = async (
  request: Request,
  response: Response,
): Promise<Response > => {
  const { name, email, password, roles ,teacherProfileId}: IUser = request.body;
  console.log("teacherProfileId",teacherProfileId)

  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);
  try {
    const user = await userRepository.findOne({ where: { email } });
    const existingRoles = await roleRepository.findByIds(roles);
    
    if (!existingRoles) {
      return response.status(404).json({ error: 'Esta role não existe!' });
    }

    if (user) {
      return response.status(409).json({ message: 'Usuario já existe' });
    }
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.roles = existingRoles;
    newUser.generateUUID();
    newUser.hashPassword();
    newUser.teacherProfile = teacherProfileId;
    await userRepository.save(newUser);

    return response.status(201).json({ message: 'Usuario criado com sucesso' });
  } catch (error) {
    return response
      .status(500)
      .json({ error: `Alguma coisa deu errado ${error}` });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { name, email,roles, teacherProfileId}: IUser = req.body;
  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);


  try {
    const user = await userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });

    if (email !== user.email) {
      const userExist = await userRepository.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({
          error: 'Usuario já está em uso',
        });
      }
    }
    // if (oldPassword && !user.checkIfPasswordMatch(oldPassword)) {
      //   return res
      //     .status(401)
      //     .json({ error: 'A senha não coincide com a antiga' });
      // }
      
    const existingRoles = await roleRepository.findByIds(roles);
    if (!existingRoles) {
      return res.status(404).json({ error: 'Esta role não existe!' });
    }

    user.email = email;
    user.name = name;
    user.roles = existingRoles;
    user.teacherProfile = teacherProfileId;
    
    await userRepository.save(user);
    return res.json({
      id: user.id,
      name,
      email,
    });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const DeleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    await userRepository.remove(user);
    return res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'alguma coisa deu errado' });
  }
};
