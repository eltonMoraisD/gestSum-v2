import { Router } from 'express';
import {
  CreateLesson,
  DeleteLesson,
  GetAllLessons,
  GetOneLesson,
  UpdateLesson,
} from '../../controllers/LessonsController';
import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post('/create', hasRole(['ROLE_ADMIN']), authMiddleware, CreateLesson);
router.get('/list', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllLessons);
router.get('/list/:id', hasRole(['ROLE_ADMIN']), authMiddleware, GetOneLesson);
router.put(
  '/update/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  UpdateLesson,
);
router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteLesson,
);

export default router;
