import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Discipline } from '../typeorm/entities/Discipline';
import { EditionDiscipline } from '../typeorm/entities/EditionDiscipline';
import { Lesson } from '../typeorm/entities/Lesson';
import { TeacherProfile } from '../typeorm/entities/TeacherProfile';

interface IEdiDisciplinas {
  numEdi: string;
  estado: string;
  anoLetivo: string;
  semestre: string;
  teacherId: TeacherProfile;
  disciplinesId: Discipline[];
  lessonId: Lesson;
}

export const CreateEditionDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
    numEdi,
    estado,
    anoLetivo,
    semestre,
    teacherId,
    disciplinesId,
    lessonId,
  }: IEdiDisciplinas = req.body;

  const editionDisciplineRepository = getRepository(EditionDiscipline);
  const teacherRepository = getRepository(TeacherProfile);
  const disciplineRepository = getRepository(Discipline);
  const lessonRepository = getRepository(Lesson);

  try {
    const teacher = await teacherRepository.findOne({
      where: { id: teacherId },
    });

    if (teacher === undefined || !teacher) {
      return res.status(404).json({ error: `Este professor não existe!` });
    }

    const discipline = await disciplineRepository.findOne({
      where: { id: disciplinesId },
      relations: ['editionDiscipline'],
    });

    if (discipline === undefined || !discipline) {
      return res.status(404).json({ error: `Esta disciplina não existe!` });
    }

    const lesson = await lessonRepository.findOne({ where: { id: lessonId } });

    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Esta aula não existe!' });
    }

    const edicaoDisciplina = new EditionDiscipline();
    edicaoDisciplina.numEdi = numEdi;
    edicaoDisciplina.estado = estado;
    edicaoDisciplina.anoLetivo = anoLetivo;
    edicaoDisciplina.semestre = semestre;
    edicaoDisciplina.teacher = teacher;
    edicaoDisciplina.disciplines = discipline;
    edicaoDisciplina.lesson = lesson;

    await editionDisciplineRepository.save(edicaoDisciplina);

    return res.json(edicaoDisciplina);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const UpdateEdicaoDisciplina = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const {
    numEdi,
    estado,
    anoLetivo,
    semestre,
    teacherId,
    disciplinesId,
    lessonId,
  }: IEdiDisciplinas = req.body;

  const editionDisciplineRepository = getRepository(EditionDiscipline);
  const teacherRepository = getRepository(TeacherProfile);
  const disciplineRepository = getRepository(Discipline);

  const lessonRepository = getRepository(Lesson);

  try {
    const teacher = await teacherRepository.findOne({
      where: { id: teacherId },
    });
    if (teacher === undefined || !teacher) {
      return res.status(404).json({ error: `Este professor não existe!` });
    }
    const editionDisc = await editionDisciplineRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (editionDisc === undefined) {
      return res
        .status(404)
        .json({ error: 'Este edição da disciplina não foi encontrado' });
    }
    const lesson = await lessonRepository.findOne({ where: { id: lessonId } });

    if (lesson === undefined || !lesson) {
      return res.status(404).json({ error: 'Esta aula não existe!' });
    }

    const discipline = await disciplineRepository.findOne({
      where: { id: disciplinesId },
    });

    if (discipline === undefined || !discipline) {
      return res.status(404).json({ error: `Esta disciplina não existe!` });
    }
    editionDisc.numEdi = numEdi;
    editionDisc.estado = estado;
    editionDisc.anoLetivo = anoLetivo;
    editionDisc.semestre = semestre;
    editionDisc.teacher = teacher;
    editionDisc.disciplines = discipline;
    editionDisc.lesson = lesson;

    await editionDisciplineRepository.save(editionDisc);

    return res.json(editionDisc);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetAllEdition = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const editionDisciplineRepository = getRepository(EditionDiscipline);

  try {
    const ediDisci = await editionDisciplineRepository.find({
      relations: ['teacher', 'lesson'],
    });
    return res.json(ediDisci);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const GetEditionDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const editionDisciplineRepository = getRepository(EditionDiscipline);
  const { id } = req.params;
  try {
    const editionDisc = await editionDisciplineRepository.findOne({
      where: { id },
      relations: ['teacher', 'lesson'],
    });
    if (editionDisc === undefined) {
      return res
        .status(404)
        .json({ error: 'Este edição da disciplina não foi encontrado' });
    }
    return res.json(editionDisc);
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};

export const DeleteEditionDiscipline = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const editionDisciplineRepository = getRepository(EditionDiscipline);
  const { id } = req.params;

  try {
    const editionDisc = await editionDisciplineRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (editionDisc === undefined) {
      return res
        .status(404)
        .json({ error: 'Este edição da disciplina não foi encontrado' });
    }
    await editionDisciplineRepository.remove(editionDisc);
    return res.json({ message: 'Edição de disciplina removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: `Alguma coisa deu errado !${error}` });
  }
};
