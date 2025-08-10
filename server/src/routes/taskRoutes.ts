import { Router } from "express";
import { 
    createTask, 
    getTasks, 
    getUserTasks, 
    updateTaskStatus,
    updateTask,
    deleteTask,
    toggleTaskCompletion
} from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/user/:userId", getUserTasks);

// Task interactions
router.patch("/:taskId/status", updateTaskStatus);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.patch("/:taskId/complete", toggleTaskCompletion);

export default router;