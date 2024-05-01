'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useTasksStore from '@/store/useTasksStore';
import ProjectTasksDisplay from './ProjectTasksDisplay';

const ProjectTasks = ({ defaultTasks }) => {
    const tasks = useTasksStore((state) => state.tasks);
    const [searchedTasks, setSearchedTasks] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        const byId = tasks.filter(task => task.id === searchKey) || [];
        setSearchedTasks([...byId])
    }, [searchKey, tasks]);

    const isSearching = searchKey.length > 0;

    return (
        <div>
            <Input
                allowClear
                placeholder="Search by task ID"
                prefix={<SearchOutlined />}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />

            <br /> <br />
            <ProjectTasksDisplay tasks={isSearching ? searchedTasks : tasks} />
        </div>
    );
};

export default ProjectTasks;