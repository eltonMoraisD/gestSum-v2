import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Summary } from '../typeorm/entities/Summary';

export const ValidateSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const summaryRepository = getRepository(Summary);
  try {
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};
