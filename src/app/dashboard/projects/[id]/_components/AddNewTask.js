'use client';
import { Button, DatePicker, Input, Modal, Checkbox, Typography, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { customAlphabet } from 'nanoid'
import useTeamMembersStore from '@/store/useTeamMembersStore';
// import useTasksStore from '@/store/useTasksStore';
import { useMutation, useQueryClient } from 'react-query';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
const mockLoading = () => new Promise((resolve) => setTimeout(resolve, 1000));

const AddNewTask = ({ projectId }) => {
    const queryClient = useQueryClient();
    // const addNewTask = useTasksStore((state) => state.addNewTask);
    const teamMembers = useTeamMembersStore((state) => state.members);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(0);
    const [assignees, setAssignees] = useState([]);

    const onChangeDate = (date, dateString) => {
        const selectedDate = new Date(date.$d);
        setDeadline(selectedDate.getTime());
    };

    const resetStates = () => {
        setTitle('');
        setDescription('');
        setDeadline(0);
        setAssignees([]);
    }

    const mutation = useMutation(mockLoading, {
        onSuccess: () => {
            queryClient.setQueryData(['projects', projectId], (oldData) => {
                const newTask = {
                    id: nanoid(),
                    title,
                    description,
                    deadline,
                    assignees,
                    status: 'PENDING',
                }
                // addNewTask(newTask);

                const updatedData = JSON.parse(JSON.stringify(oldData.data))
                updatedData.tasks.push(newTask);
                updatedData.recentActivities.push({
                    id: nanoid(),
                    description: `Admin created a new task with title ${title} and assigned ${assignees.length} people for the task.`,
                    timestamp: Date.now(),
                })
                setIsModalOpen(false);
                return {status: 'success', data: updatedData}
            })
        }
    })

    const handleOk = async () => {
        try {
            // setLoading(true);
            // await mockLoading();
            if (!title || !description || !deadline) {
                alert('All fields are required!');
                return;
            }
            mutation.mutate();
            // const newTask = {
            //     id: nanoid(),
            //     title,
            //     description,
            //     deadline,
            //     assignees,
            //     status: 'PENDING',
            // }
            // addNewTask(newTask);
            // setIsModalOpen(false);
        } finally {
            // setLoading(false)
        }
    };

    return (
        <div>
            <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
            >
                Add New
            </Button>

            <Modal
                title="Add New Task"
                okText="Add Task"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ disabled: mutation.isLoading }}
                cancelButtonProps={{ disabled: mutation.isLoading }}
                afterClose={resetStates}
                destroyOnClose
            >
                <div className='flex flex-col gap-3 mt-4'>
                    <Input placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)} />

                    <Input.TextArea placeholder='Description for this task' value={description} onChange={(e) => setDescription(e.target.value)} />

                    <DatePicker
                        placeholder='Select deadline'
                        onChange={onChangeDate}
                        showTime
                    />
                    <div>
                        <p className='font-semibold mb-3'>
                            Assign from available team members:
                        </p>
                        <Checkbox.Group
                            className='max-w-40'
                            value={assignees}
                            onChange={values => setAssignees(values)}
                            options={teamMembers.map(member => ({ label: member.name, value: member.id }))}
                        />
                    </div>

                    <Alert type='warning' message='All fields are required!' showIcon />
                    <Alert type='warning' message='Mocking Only! Changes will be lost if you leave/reload this page.' showIcon />
                </div>
            </Modal>
        </div>
    );
};

export default AddNewTask;