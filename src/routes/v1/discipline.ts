import { Router } from 'express';
import {
  CreateDiscipline,
  DeleteDiscipline,
  GetAllDisciplines,
  GetDiscipline,
  UpdateDiscipline,
} from '../../controllers/DisciplineController';

import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post(
  '/create',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  CreateDiscipline,
);

router.get('/list', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllDisciplines);
router.get('/list/:id', hasRole(['ROLE_ADMIN']), authMiddleware, GetDiscipline);
router.put(
  '/update/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  UpdateDiscipline,
);

router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteDiscipline,
);

export default router;
