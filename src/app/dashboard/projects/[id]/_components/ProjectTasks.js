'use client';

import { Button, DatePicker, Input, Select, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useTasksStore from '@/store/useTasksStore';
import ProjectTasksDisplay from './ProjectTasksDisplay';
import useTeamMembersStore from '@/store/useTeamMembersStore';

const ProjectTasks = ({ allTasks }) => {
    const tasks = useTasksStore((state) => state.tasks);
    const teamMembers = useTeamMembersStore((state) => state.members);
    const [showState, setShowState] = useState('');

    // search logic
    const [searchedTasks, setSearchedTasks] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const onSearchKeyChange = (e) => {
        const value = e.target.value;
        setSearchKey(value);
        if (value.length) {
            setShowState('SEARCH');
        } else {
            setShowState('');
        }
    }

    useEffect(() => {
        const byId = tasks.filter(task => task.id === searchKey) || [];
        setSearchedTasks([...byId])
    }, [searchKey, tasks]);

    const isSearching = searchKey.length > 0;

    // filter logic
    const [filteredTasks, setFilteredTasks] = useState([]); console.log(filteredTasks);
    const [filterType, setFilterType] = useState('status');
    const [filterValue, setFilterValue] = useState('');

    const onResetFilter = () => {
        setShowState('');
        setFilterType('status');
        setFilterValue('');
    }

    const onRequestFilter = () => {
        if (!filterValue) {
            alert('Select a filter value');
            return;
        };
        setShowState('FILTER');
        if (filterType === 'status') {
            setFilteredTasks(tasks.filter(task => task.status === filterValue));
        }
        else if (filterType === 'date') {
            setFilteredTasks(tasks.filter(task => task.deadline <= filterValue))
        }
        else if (filterType === 'assignee') {
            setFilteredTasks(tasks.filter(task => task.assignees.indexOf(filterValue) !== -1))
        }
    }

    // return statement
    return (
        <div>
            {/* Search feature */}
            <Input
                allowClear
                placeholder="Search by task ID"
                prefix={<SearchOutlined />}
                value={searchKey}
                onChange={onSearchKeyChange}
            />

            <br /><br />
            {/* Filter feature */}
            <div className='flex flex-col md:flex-row gap-2 items-center'>
                <p className=''>Filter by</p>

                {/* Filter Type */}
                <Select
                    value={filterType}
                    style={{ width: 120 }}
                    onChange={(value) => { setFilterType(value); setFilterValue('') }}
                    options={[
                        { value: 'status', label: 'Status' },
                        { value: 'date', label: 'Due Date' },
                        { value: 'assignee', label: 'Assignees' },
                    ]}
                />

                {/* Filter Values */}
                {filterType === 'status' && (
                    <Select
                        value={filterValue}
                        style={{ width: 150 }}
                        onChange={(value) => setFilterValue(value)}
                        options={[
                            { value: 'PENDING', label: 'PENDING' },
                            { value: 'ONPROGRESS', label: 'ON PROGRESS' },
                            { value: 'COMPLETED', label: 'COMPLETED' },
                        ]}
                    />
                )}
                {filterType === 'date' && (
                    <DatePicker
                        placeholder='Max deadline'
                        onChange={(date) => setFilterValue(new Date(date.$d).getTime())}
                    />
                )}
                {filterType === 'assignee' && (
                    <Select
                        defaultValue=""
                        style={{ width: 150 }}
                        onChange={(value) => setFilterValue(value)}
                        options={teamMembers.map(member => ({ value: member.id, label: member.name }))}
                    />
                )}

                {/* Filter action buttons */}
                <div className='flex gap-2'>
                    <Button type='primary' onClick={onRequestFilter}>Filter</Button>
                    <Button type='default' onClick={onResetFilter}>Reset</Button>
                </div>
            </div>

            <br />
            {/* Display intended tasks */}
            <ProjectTasksDisplay tasks={showState === 'SEARCH' ? searchedTasks : showState === 'FILTER' ? filteredTasks : tasks} />
        </div>
    );
};

export default ProjectTasks;