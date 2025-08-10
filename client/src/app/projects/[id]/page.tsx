"use client";

import React, { useState } from 'react'
import { Status } from '@/state/api';
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
    const [defaultTaskStatus, setDefaultTaskStatus] = useState<Status>(Status.Todo);

    return <div>
        <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
        defaultStatus={defaultTaskStatus}
        />
        <ProjectHeader 
            activateTab={activateTab} 
            setActivateTab={setActivateTab}
            projectID={id}
        />
        { activateTab === "Board" && (
            <Board id={id} setIsModalNewTaskOpen={(isOpen, status) => {
                if (status) setDefaultTaskStatus(status);
                setIsModalNewTaskOpen(isOpen);
            }}/>
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