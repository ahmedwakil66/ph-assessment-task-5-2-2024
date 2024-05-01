'use client';
import { Button, DatePicker, Input, Modal, Checkbox, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import useTeamMembersStore from '@/store/useTeamMembersStore';

const AddNewTask = () => {
    const teamMembers = useTeamMembersStore((state) => state.members);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignees, setAssignees] = useState([]);

    const onChangeDate = (date, dateString) => {
        const selectedDate = new Date(date.$d);
        setDeadline(selectedDate.getTime());
    };

    const handleOk = () => {
        console.log(title, description, deadline, assignees);
        // setIsModalOpen(false);
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
                            // value={assignees}
                            onChange={values => setAssignees(values)}
                            options={teamMembers.map(member => ({ label: member.name, value: member.id }))}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddNewTask;