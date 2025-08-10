"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Project, useGetProjectsQuery, useRenameProjectMutation, useDeleteProjectMutation } from "@/state/api";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, PlusSquare, Search, Settings, ShieldAlert, ShieldCheck, ShieldX, User, Users, X } from "lucide-react";
import ModalNewProject from "@/app/projects/ModalNewProject";
import Image from "next/image"; 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from 'react'

const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);
    const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

    const { data: projects } = useGetProjectsQuery();
    
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed,
    );

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between
    shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto
    bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

    return <>
        <ModalNewProject
            isOpen={isModalNewProjectOpen}
            onClose={() => setIsModalNewProjectOpen(false)}
        />
        <div className={sidebarClassNames}>
        <div className="flex h-[100%] w-full flex-col justify-start">
            {/* TOP LOGO */}
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                    SONAT
                </div>
                {isSidebarCollapsed ? null : (
                    <button 
                    className="py-3" 
                    onClick={()=> {
                        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
                    }}
                ><X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white"/></button>
                )}
            </div>
            {/* TEAM */}
            <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
                <div>
                    <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                        SONAT Management
                    </h3>
                    <div className="mt-1 flex items-start gap-2">
                        <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <p className="text-xs text-gray-500">Private</p>
                    </div>
                </div>
            </div>
            <nav className="z-10 w-full">
                <SidebarLink icon={Home} label="Home" href="/" />
                <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
                <SidebarLink icon={Search} label="Search" href="/search" />
                <SidebarLink icon={Settings} label="Settings" href="/settings" />
                <SidebarLink icon={User} label="Users" href="/users" />
                <SidebarLink icon={Users} label="Teams" href="/teams" />
            </nav>

            <div className="group flex w-full items-center justify-between px-8 py-3">
                <button 
                    onClick={() => setShowProjects((prev) => !prev)}
                    className="flex items-center focus:outline-none gap-2 text-gray-500"
                >
                    {showProjects ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                    <span>Projects</span>
                </button>
                <button
                    onClick={() => setIsModalNewProjectOpen(true)}
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                    <PlusSquare className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                </button>
            </div>
            {showProjects && projects?.map((project) => (
                <ProjectSidebarItem 
                    key={project.id} 
                    project={project}
                />
            ))}

            <div className="group flex w-full items-center justify-between px-8 py-3">
                <button onClick={() => setShowPriority((prev) => !prev)}
                className="flex items-center focus:outline-none gap-2 text-gray-500">
                    {showPriority ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                    <span>Priority</span>
                </button>
            </div>
            
            {
                showPriority && (
                    <>
                    <SidebarLink
                    icon={AlertCircle}
                    label="Urgent"
                    href="/priority/urgent"
                    />
                    <SidebarLink
                    icon={ShieldAlert}
                    label="High"
                    href="/priority/high"
                    />
                    <SidebarLink
                    icon={AlertTriangle}
                    label="Medium"
                    href="/priority/medium"
                    />
                    <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
                    <SidebarLink
                    icon={Layers3}
                    label="Backlog"
                    href="/priority/backlog"
                    />
                </>
                )
            }
        </div>
    </div>
    </>
}

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    // isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label 
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
            hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-100 text-white dark:bg-gray-600": ""
            } justify-start px-8 py-3`}>
                {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200"/>
                )}
                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}


interface ProjectSidebarItemProps {
    project: Project;
}

const ProjectSidebarItem = ({ project }: ProjectSidebarItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === `/projects/${project.id}`;
    const [showOptions, setShowOptions] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(project.name);

    const [renameProject] = useRenameProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();

    const handleRename = async () => {
        try {
            const trimmedName = newName.trim();
            if (trimmedName !== "" && trimmedName !== project.name) {
                await renameProject({ 
                    projectId: project.id, 
                    name: trimmedName 
                }).unwrap();
            }
            setIsRenaming(false);
            setShowOptions(false);
        } catch (error) {
            console.error('Failed to rename project:', error);
            alert(error instanceof Error ? error.message : 'Failed to rename project');
        }
    };

    const router = useRouter();
    
    const handleDelete = async () => {
        try {
            await deleteProject(project.id).unwrap();
            router.push('/');
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert(error instanceof Error ? error.message : 'Failed to delete project');
        }
    };

    return (
        <div className="relative">
            <div className={`group flex w-full items-center justify-between pl-10 pr-8 py-3 transition-colors
                hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive ? "bg-gray-100 dark:bg-gray-600" : ""
                }`}>
                <Link href={`/projects/${project.id}`} className="flex overflow-hidden flex-1 items-center gap-3">
                    {isActive && (
                        <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200"/>
                    )}
                    <Briefcase className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                    {isRenaming ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleRename();
                                } else if (e.key === 'Escape') {
                                    setIsRenaming(false);
                                    setNewName(project.name);
                                    setShowOptions(false);
                                }
                            }}
                            className="w-full bg-transparent px-2 py-1 text-sm text-gray-800 focus:outline-none dark:text-gray-100"
                            onBlur={() => {
                                setIsRenaming(false);
                                setNewName(project.name);
                                setShowOptions(false);
                            }}
                            autoFocus
                        />
                    ) : (
                        <span className="flex-1 truncate text-sm text-gray-800 dark:text-gray-100">
                            {project.name}
                        </span>
                    )}
                </Link>
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="opacity-0 group-hover:opacity-100"
                >
                    <Settings className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                </button>
            </div>
            
            {showOptions && !isRenaming && (
                <div className="absolute right-2 top-full z-50 mt-1 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800">
                    <div className="py-1">
                        <button
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => {
                                setIsRenaming(true);
                                setNewName(project.name);
                            }}
                        >
                            Rename
                        </button>
                        <button
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar