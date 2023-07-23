import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, createTasks, getTask, updateTask, deleteTasks } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/tasks.schema.js';

const router = Router()

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTasks)
router.put('/tasks/:id', authRequired, updateTask)
router.delete('/tasks/:id', authRequired, deleteTasks)


export default router