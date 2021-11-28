import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Lesson } from '../typeorm/entities/Lesson';

interface ILessons {
  number: number;
  weekDay: string;
  date: string;
  local: string;
  duration: string;
}

export const CreateLesson = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { number, weekDay, date, local, duration }: ILessons = req.body;
  const lessonRepository = getRepository(Lesson);
  try {
    const lesson = new Lesson();
    lesson.number = number;
    lesson.weekDay = weekDay;
    lesson.date = date;
    lesson.local = local;
    lesson.duration = duration;

    await lessonRepository.save(lesson);
    return res.json(lesson);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetAllLessons = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const lessonRepository = getRepository(Lesson);

  try {
    const lessons = await lessonRepository.find();

    return res.json(lessons);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetOneLesson = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const lessonRepository = getRepository(Lesson);

  try {
    const lesson = await lessonRepository.findOne({ where: { id } });
    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    return res.json(lesson);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const UpdateLesson = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const lessonRepository = getRepository(Lesson);
  const { number, weekDay, date, local, duration }: ILessons = req.body;
  try {
    const lesson = await lessonRepository.findOne({ where: { id } });
    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    lesson.number = number;
    lesson.weekDay = weekDay;
    lesson.date = date;
    lesson.local = local;
    lesson.duration = duration;

    await lessonRepository.save(lesson);
    return res.json(lesson);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const DeleteLesson = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const lessonRepository = getRepository(Lesson);
  try {
    const lesson = await lessonRepository.findOne({ where: { id } });
    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    await lessonRepository.remove(lesson);

    return res.json({ message: 'Aula deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};
