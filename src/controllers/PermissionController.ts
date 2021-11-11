import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Permission } from '../typeorm/entities/Permission';

export const CreatePermission = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const permissionRepository = getRepository(Permission);
  const { name, description } = req.body;
  try {
    const isPermissionNameExist = await permissionRepository.findOne({
      where: { name },
    });

    if (isPermissionNameExist) {
      return res
        .status(409)
        .json({ message: 'Esta permição jã existe na base de dados' });
    }
    const permission = permissionRepository.create({
      name,
      description,
    });
    await permissionRepository.save(permission);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const ListAllPermissions = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const permissionRepository = getRepository(Permission);

  try {
    const allPermissions = await permissionRepository.find({
      select: ['id', 'name', 'description'],
    });

    return res.json(allPermissions);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

//TODO - list permission by id, delete permission, update permission
