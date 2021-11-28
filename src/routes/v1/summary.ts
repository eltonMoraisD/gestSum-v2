import { Router } from 'express';
import {
  CreateSummary,
  DeleteSummary,
  GetAllSummaries,
  GetSummary,
  UpdateSummary,
} from '../../controllers/SummaryController';
const router = Router();
import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

router.post('/create', hasRole(['ROLE_ADMIN']), authMiddleware, CreateSummary);
router.get('/list', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllSummaries);
router.get('/list/:id', hasRole(['ROLE_ADMIN']), authMiddleware, GetSummary);
router.put(
  '/update/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  UpdateSummary,
);
router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteSummary,
);

export default router;
