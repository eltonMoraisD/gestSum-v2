import { Router } from 'express';
import { ValidateSummary } from '../../controllers/ValidateSummaryController';

const router = Router();
import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

router.put(
  '/validate/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  ValidateSummary,
);

export default router;
