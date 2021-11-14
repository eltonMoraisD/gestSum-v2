import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Permission } from '../typeorm/entities/Permission';
import { Role } from '../typeorm/entities/Role';

export const CreateRole = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const roleRepository = getRepository(Role);
  const permissionRepository = getRepository(Permission);
  const { name, description, permission } = req.body;
  try {
    const isRoleNameExist = await roleRepository.findOne({ where: { name } });

    if (isRoleNameExist) {
      return res
        .status(409)
        .json({ message: 'Este Role jã existe na base de dados' });
    }
    const existingPermissions = await permissionRepository.findByIds(
      permission,
    );

    const role = roleRepository.create({
      name,
      description,
      permission: existingPermissions,
    });
    await roleRepository.save(role);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const ListAllRoles = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const roleRepository = getRepository(Role);
  try {
    const allRoles = await roleRepository.find({
      relations: ['permission'],
      select: ['id', 'name', 'description'],
    });
    return res.json(allRoles);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

//TODO - list roles by id, delete role, update role
