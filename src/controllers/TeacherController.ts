import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TeacherProfile } from '../typeorm/entities/TeacherProfile';

interface ITeacherProfile {
  name: string;
  sigla: string;
  ocupation: string;
  degree: string;
}

export const CreateTeacherProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { sigla, name, ocupation, degree }: ITeacherProfile = req.body;
  const teacherRepository = getRepository(TeacherProfile);

  try {
    const teacher = teacherRepository.create({
      sigla,
      name,
      ocupation,
      degree,
    });

    await teacherRepository.save(teacher);

    return res.status(200).json({
      sigla,
      name,
      ocupation,
      degree,
    });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado ${error}` });
  }
};

export const GetAllTeachers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const teacherRepository = getRepository(TeacherProfile);

  try {
    const allTeachers = await teacherRepository.find({
      relations: [
        'user',
        'editionDisciplines',
        'editionDisciplines.lesson',
        'editionDisciplines.lesson.summary',
      ],
    });
    return res.json(allTeachers);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetTeacher = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const teacherRepository = getRepository(TeacherProfile);

  try {
    const teacher = await teacherRepository.findOne({
      where: { id },
      relations: [
        'user',
        'editionDisciplines',
        'editionDisciplines.lesson',
        'editionDisciplines.lesson.summary',
      ],
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Este perfil não foi encontrado' });
    }
    return res.json(teacher);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const UpdateTeacherProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { name, sigla, ocupation, degree }: ITeacherProfile = req.body;
  const teacherRepository = getRepository(TeacherProfile);
  try {
    const teacher = await teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Este perfil não foi encontrado' });
    }

    teacher.name = name;
    teacher.sigla = sigla;
    teacher.ocupation = ocupation;
    teacher.degree = degree;

    await teacherRepository.save(teacher);

    const teacherUpdated = teacherRepository.create(req.body);

    return res.json(teacherUpdated);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const DeleteTeacherProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const teacherRepository = getRepository(TeacherProfile);

  try {
    const teacher = await teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      return res.status(404).json({ error: 'Este perfil não foi encontrado' });
    }
    await teacherRepository.remove(teacher);
    return res.json({ message: 'Docente deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};
