import Header from '@/components/Header';
import { Clock, Filter, Grid3x3, List, PlusSquare, Share2, Table, EllipsisVertical, Copy, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import ModalNewProject from './ModalNewProject';
import ModalNewTask from '@/components/ModalNewTask';
import { useGetProjectsQuery, useDeleteProjectMutation, useRenameProjectMutation } from '@/state/api';

type Props = {
  activateTab: string;
  setActivateTab: (tabName: string) => void;
  projectID: string;
}

const ProjectHeader = ({ activateTab, setActivateTab, projectID }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { data: projects, isLoading } = useGetProjectsQuery();

  const projectName = isLoading 
    ? "Loading..." 
    : projects?.find(p => p.id === Number(projectID))?.name || "Unknown Project";

  const handleDuplicate = async () => {
    setShowOptions(false);
  };

  const [renameProject] = useRenameProjectMutation();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");

  const startRename = () => {
    setNewName(projectName);
    setIsRenaming(true);
    setShowOptions(false);
  };

  const cancelRename = () => {
    setIsRenaming(false);
    setNewName("");
  };

  const handleRename = async () => {
    try {
      if (newName.trim() !== "" && newName.trim() !== projectName) {
        await renameProject({ projectId: Number(projectID), name: newName.trim() });
      }
      setIsRenaming(false);
      setNewName("");
    } catch (error) {
      console.error('Failed to rename project:', error);
      // Hiển thị lỗi cho user
      alert(error instanceof Error ? error.message : 'Failed to rename project');
    }
  };

  const [deleteProject] = useDeleteProjectMutation();

  const handleMoveToTrash = async () => {
    try {
      await deleteProject(Number(projectID));
      setShowOptions(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <div className="flex items-center justify-between">
          <Header 
            name={isRenaming ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-secondary dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRename();
                    } else if (e.key === 'Escape') {
                      cancelRename();
                    }
                  }}
                  placeholder="Enter new name..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleRename}
                    className="rounded-md bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                    disabled={!newName.trim() || newName.trim() === projectName}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelRename}
                    className="rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : projectName}
            buttonComponent={
              <div className="flex gap-2">
                <button
                  className="flex items-center rounded-md bg-blue-800 px-3 py-2 text-white hover:bg-blue-600"
                  onClick={() => setIsModalNewProjectOpen(true)}>
                  <PlusSquare className="mr-2 h-5 w-5" /> New Board
                </button>
                <div className="relative">
                  <button
                    className="flex items-center rounded-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <EllipsisVertical className="h-5 w-5" />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-dark-secondary">
                      <div className="py-1">
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={handleDuplicate}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={startRename}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Rename
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                          onClick={handleMoveToTrash}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Move to Trash
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            } 
          />
        </div>
      </div>
      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 py-[8px] pt-2 pb-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActivateTab}
            activeTab={activateTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActivateTab}
            activeTab={activateTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActivateTab}
            activeTab={activateTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActivateTab}
            activeTab={activateTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input type="text" placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4
      ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
        }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  )
}

export default ProjectHeader