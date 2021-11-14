import { Router } from 'express';
import { CreateTeacherProfile, DeleteTeacherProfile, GetAllTeachers, GetTeacher, UpdateTeacherProfile } from '../../controllers/TeacherController';

import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post('/teachers', hasRole(['ROLE_ADMIN']), authMiddleware, CreateTeacherProfile);
router.get('/teachers', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllTeachers);
router.get('/teacher/:id', hasRole(['ROLE_ADMIN']), authMiddleware, GetTeacher);
router.put('/teacher/:id', hasRole(['ROLE_ADMIN']), authMiddleware, UpdateTeacherProfile);
router.delete('/teacher/:id', hasRole(['ROLE_ADMIN']), authMiddleware, DeleteTeacherProfile);
export default router;