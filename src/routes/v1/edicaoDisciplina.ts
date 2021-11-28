import { Router } from 'express';
import {
  CreateEditionDiscipline,
  DeleteEditionDiscipline,
  GetAllEdition,
  GetEditionDiscipline,
  UpdateEdicaoDisciplina,
} from '../../controllers/EditionDisciplineController';

import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post(
  '/create',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  CreateEditionDiscipline,
);
router.get('/all', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllEdition);
router.get(
  '/edition/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  GetEditionDiscipline,
);

router.put(
  '/update/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  UpdateEdicaoDisciplina,
);

router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteEditionDiscipline,
);

export default router;
