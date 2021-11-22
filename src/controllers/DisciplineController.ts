import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Discipline } from '../typeorm/entities/Discipline';

interface IDiscipline {
  code: string;
  name: string;
  sinopse: string;
}

export const CreateDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const disciplineRepository = getRepository(Discipline);
  const { code, name, sinopse }: IDiscipline = req.body;
  try {
    const isExist = await disciplineRepository.findOne({ where: { name } });
    if (isExist) {
      return res.status(409).json({ error: 'Esta disciplina já existe!' });
    }
    const discipline = disciplineRepository.create({
      code,
      name,
      sinopse,
    });
    await disciplineRepository.save(discipline);
    return res.json(discipline);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetAllDisciplines = async (
  _: any,
  res: Response,
): Promise<Response> => {
  const disciplineRepository = getRepository(Discipline);

  try {
    const allDisciplines = await disciplineRepository.find({
      relations: ['editionDiscipline'],
    });
    return res.json(allDisciplines);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const disciplineRepository = getRepository(Discipline);
  const { id } = req.params;
  try {
    const discipline = await disciplineRepository.findOne({
      where: { id },
      relations: ['editionDiscipline'],
    });
    if (discipline === undefined || !discipline) {
      return res.status(500).json({ error: `A disciplina não foi encontrada` });
    }

    return res.json(discipline);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const UpdateDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const disciplineRepository = getRepository(Discipline);
  const { id } = req.params;
  const { code, name, sinopse }: IDiscipline = req.body;
  try {
    const discipline = await disciplineRepository.findOne({ where: { id } });
    if (discipline === undefined || !discipline) {
      return res.status(500).json({ error: `A disciplina não foi encontrada` });
    }
    discipline.code = code;
    discipline.name = name;
    discipline.sinopse = sinopse;
    await disciplineRepository.save(discipline);
    return res.json(discipline);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const DeleteDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const disciplineRepository = getRepository(Discipline);
  const { id } = req.params;
  try {
    const discipline = await disciplineRepository.findOne({
      where: { id },
    });
    if (discipline === undefined || !discipline) {
      return res.status(500).json({ error: `A disciplina não foi encontrada` });
    }
    await disciplineRepository.remove(discipline);
    return res.json({ message: 'Disciplina removido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};
