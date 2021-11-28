import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Lesson } from '../typeorm/entities/Lesson';
import { Summary } from '../typeorm/entities/Summary';

interface ISummary {
  summaryName: string;
  activities: string;
  numStudents: number;
  lessonId: Lesson;
  isValidate: boolean;
}

export const CreateSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
    activities,
    lessonId,
    numStudents,
    summaryName,
    isValidate,
  }: ISummary = req.body;
  const summaryRepository = getRepository(Summary);
  const lessonRepository = getRepository(Lesson);
  try {
    const lesson = await lessonRepository.findOne({ where: { id: lessonId } });

    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Esta aula não foi encontrada' });
    }
    const summary = new Summary();
    let tempValidate: boolean;
    if (isValidate === null || isValidate === undefined || isValidate) {
      tempValidate = isValidate;
      tempValidate = false; // precisa ser falso apartir do momento que o professor criar o sumario pq sao os serviços academicos quem valida o sumario
    }
    summary.summaryName = summaryName;
    summary.activities = activities;
    summary.numStudents = numStudents;
    summary.lesson = lesson;
    summary.isValidate = tempValidate;

    await summaryRepository.save(summary);

    return res.json(summary);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const GetAllSummaries = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const summaryRepository = getRepository(Summary);
  try {
    const summary = await summaryRepository.find();
    return res.json(summary);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const GetSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const summaryRepository = getRepository(Summary);

  try {
    const summary = await summaryRepository.findOne({ where: { id } });
    if (summary === undefined || !summary) {
      return res.status(404).json({ error: 'Este sumário não existe' });
    }
    return res.json(summary);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const UpdateSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const summaryRepository = getRepository(Summary);
  const lessonRepository = getRepository(Lesson);

  const {
    activities,
    isValidate,
    lessonId,
    numStudents,
    summaryName,
  }: ISummary = req.body;

  try {
    const summary = await summaryRepository.findOne({ where: { id } });
    if (summary === undefined || !summary) {
      return res.status(404).json({ error: 'Este sumário não existe' });
    }

    let tempValidate: boolean;
    if (isValidate === null || isValidate === undefined || isValidate) {
      tempValidate = isValidate;
      tempValidate = false; // precisa ser falso apartir do momento que o professor criar o sumario pq sao os serviços academicos quem valida o sumario
    }
    const lesson = await lessonRepository.findOne({ where: { id: lessonId } });

    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Esta aula não foi encontrada' });
    }

    summary.summaryName = summaryName;
    summary.activities = activities;
    summary.numStudents = numStudents;
    summary.lesson = lessonId;
    summary.isValidate = tempValidate;

    await summaryRepository.save(summary);

    return res.json(summary);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};

export const DeleteSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const summaryRepository = getRepository(Summary);

  try {
    const summary = await summaryRepository.findOne({ where: { id } });
    if (summary === undefined || !summary) {
      return res.status(404).json({ error: 'Este sumário não foi encontrado' });
    }
    console.log('SUMARY', summary);
    await summaryRepository.remove(summary);
    return res.json({ message: 'Sumário deletado!' });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};
