import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Summary } from '../typeorm/entities/Summary';

export const ValidateSummary = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const summaryRepository = getRepository(Summary);
  const { id } = req.params;
  const { isValidate } = req.body;
  try {
    const summary = await summaryRepository.findOne({ where: { id } });
    if (isValidate) {
      summary.isValidate = isValidate;
      await summaryRepository.save(summary);
      return res.json({ message: 'sumario validado com sucesso', summary });
    } else {
      return res.json({ message: 'Sumario invalidado' });
    }
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado! ${error}` });
  }
};
