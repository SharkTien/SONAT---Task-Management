import { Router } from "express";
import { createProject, getProjects, getProjectById, deleteProject, renameProject } from "../controllers/projectControllers";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectById);
router.patch("/:id/rename", renameProject);

export default router;
