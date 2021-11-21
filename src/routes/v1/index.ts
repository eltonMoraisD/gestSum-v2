import { Router } from 'express';

import auth from './auth';
import users from './users';
import roles from './roles';
import permission from './permission';
import teacherProfile from './teacherProfile';
import edicaoDisciplina from './edicaoDisciplina';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/roles', roles);
router.use('/permission', permission);
router.use('/profile', teacherProfile);
router.use('/edition-discipline', edicaoDisciplina);

export default router;
