import { Router } from 'express';
import { CreateRole, ListAllRoles } from '../../controllers/RoleController';

import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, CreateRole);
router.get('/list', authMiddleware, ListAllRoles);

export default router;
