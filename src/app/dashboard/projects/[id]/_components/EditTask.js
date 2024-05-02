import { useState } from 'react';
import { Alert, Checkbox, DatePicker, Input, Modal } from 'antd';
import useTeamMembersStore from '@/store/useTeamMembersStore';
import { useMutation, useQueryClient } from 'react-query';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
const mockLoading = () => new Promise((resolve) => setTimeout(resolve, 1000));

// This component has made it possible to Edit a task. Whenever
// a user click on Edit task button this component opens editing
// panel in a modal. This component is also responsible to mutate
// tanstack's cache so that the edited data persists, 
// until page reloads or 1 hour passes, whichever happens first.

const EditTask = ({ open, close, oldTask, projectId }) => {
    const queryClient = useQueryClient();
    const teamMembers = useTeamMembersStore((state) => state.members);

    const [title, setTitle] = useState(oldTask.title);
    const [description, setDescription] = useState(oldTask.description);
    const [deadline, setDeadline] = useState(oldTask.deadline);
    const [assignees, setAssignees] = useState(oldTask.assignees);

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
                const editedTask = {
                    id: oldTask.id,
                    title,
                    description,
                    deadline,
                    assignees,
                    status: oldTask.status,
                }

                const updatedData = JSON.parse(JSON.stringify(oldData.data))

                const remains = updatedData.tasks.filter(task => task.id !== editedTask.id);
                updatedData.tasks = [...remains, editedTask];

                updatedData.recentActivities.push({
                    id: nanoid(),
                    description: `Admin edited a task with ID ${editedTask.id}.`,
                    timestamp: Date.now(),
                })
                close();
                return { status: 'success', data: updatedData }
            })
        }
    })

    const handleOk = async () => {
        if (!title || !description || !deadline) {
            alert('All fields are required!');
            return;
        }
        mutation.mutate();
    };


    if (open) {
        return (
            <Modal
                title="Edit Task"
                okText="Finish"
                open={open}
                onOk={handleOk}
                onCancel={close}
                okButtonProps={{ disabled: mutation.isLoading }}
                cancelButtonProps={{ disabled: mutation.isLoading }}
                // afterClose={resetStates}
                destroyOnClose
            >
                <div className='flex flex-col gap-3 mt-4'>
                    <Input placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)} />

                    <Input.TextArea placeholder='Description for this task' value={description} onChange={(e) => setDescription(e.target.value)} />

                    <DatePicker
                        placeholder='Select new deadline'
                        onChange={onChangeDate}
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
                    <Alert type='warning' message='Mocking Only! Changes will be lost if you reload this page.' showIcon />
                </div>
            </Modal>
        )
    }
    return null;
};

export default EditTask;