"use client";

import React, { useState } from 'react'
import ProjectHeader from '@/app/projects/ProjectHeader';
import Board from '../BoardView';
import List from '../ListView';
import TimelineView from '../TimelineView';
import TableView from '../TableView';
import ModalNewTask from '@/components/ModalNewTask';

type Props = {
    params: {id: string}
}

const Project = ({ params } : Props) => {
    const { id } = params;
    const [activateTab, setActivateTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    return <div>
        <ModalNewTask
        isOpen = {isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
        />
        <ProjectHeader 
            activateTab={activateTab} 
            setActivateTab={setActivateTab}
        />
        { activateTab === "Board" && (
            <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        { activateTab === "List" && (
            <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        { activateTab === "Timeline" && (
            <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        { activateTab === "Table" && (
            <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}    
    </div>
}

export default Project;