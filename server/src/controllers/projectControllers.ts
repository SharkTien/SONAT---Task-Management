import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) }
    });
    
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json(project);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving project: ${error.message}` });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Delete project request received:", req.params);
  const { id } = req.params;
  try {
    // Kiểm tra xem project có tồn tại không
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Xóa project và tất cả dữ liệu liên quan (cascade delete)
    await prisma.project.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Project and all related data deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting project: ${error.message}` });
  }
};

export const renameProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Validate input
    if (!name || name.trim() === "") {
      res.status(400).json({ message: "Project name cannot be empty" });
      return;
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Check if name is already taken
    const projectWithSameName = await prisma.project.findFirst({
      where: {
        name: name,
        id: { not: Number(id) } // Exclude current project
      }
    });

    if (projectWithSameName) {
      res.status(400).json({ message: "Project name already exists" });
      return;
    }

    // Update project name
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { name: name.trim() }
    });

    res.json(updatedProject);
  } catch (error: any) {
    res.status(500).json({ message: `Error renaming project: ${error.message}` });
  }
};
