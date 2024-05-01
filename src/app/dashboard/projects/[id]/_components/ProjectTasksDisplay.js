'use client';
import useTeamMembersStore from '@/store/useTeamMembersStore';
import useTasksStore from '@/store/useTasksStore';
import { Alert, Avatar, Button, Divider, List, Tabs, Typography } from 'antd';
const { Text } = Typography;
import DroppableArea from './DroppableArea';
import DraggableStatus from './DraggableStatus';

const ProjectTask = ({ task }) => {
    const teamMembers = useTeamMembersStore((state) => state.members);
    const updateTask = useTasksStore((state) => state.updateTask)
    const assignees = teamMembers.filter(member => task.assignees.indexOf(member.id) !== -1);

    const handleDrop = (newStatus) => {
        if (newStatus === task.status || task.markedCompleted) return;
        updateTask({
            ...task,
            status: newStatus,
        });
    };

    const markAsCompleted = () => {
        updateTask({
            ...task,
            status: 'COMPLETED',
            markedCompleted: true,
        })
    }

    return (
        <div className='shadow-md p-3 rounded-lg bg-slate-200'>
            {task.markedCompleted && (
                <Alert message="Oww! We finished this :)" type="success" className='!mb-2' showIcon />
            )}
            <Typography.Title level={5}>
                {task.title}. &nbsp; #<Text copyable>{task.id}</Text>
            </Typography.Title>

            <Tabs
                defaultActiveKey='1'
                items={[
                    // Project details
                    {
                        key: '1',
                        label: 'Details',
                        children: (
                            <>
                                <>
                                    <Text className='font-semibold'>Description: </Text>
                                    <Text>{task.description}</Text>
                                </>
                                <div className='mt-2'>
                                    <Text className='font-semibold'>Status: </Text>
                                    <Text className='shadow-lg rounded p-1'>{task.status}</Text>
                                </div>
                                <div className='mt-2'>
                                    <Text className='font-semibold'>Deadline: </Text>
                                    {new Date(task.deadline).toLocaleString().split(',')[1]},&nbsp;
                                    {new Date(task.deadline).toDateString()}
                                </div>
                            </>
                        )
                    },
                    // Project assigned members
                    {
                        key: '2',
                        label: 'Assignees',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={assignees}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.thumb} />}
                                            title={<a href="#">{item.name}</a>}
                                            description={item.bio}
                                        />
                                    </List.Item>
                                )}
                            />
                        )
                    },
                    // Project task action
                    {
                        key: '3',
                        label: 'Actions',
                        children: (
                            <div>
                                <p>
                                    This task is currently &nbsp;
                                    <Button>{task.status}</Button>
                                </p> <br />
                                <DroppableArea onDrop={handleDrop} markedCompleted={task.markedCompleted} />
                                <div className='mt-3 flex gap-2 flex-wrap'>
                                    <DraggableStatus status="PENDING" currentStatus={task.status} markedCompleted={task.markedCompleted} />
                                    <DraggableStatus status="COMPLETED" currentStatus={task.status} markedCompleted={task.markedCompleted} />
                                    <DraggableStatus status="ONPROGRESS" currentStatus={task.status} markedCompleted={task.markedCompleted} />
                                </div>

                                <Divider plain>OR</Divider>

                                <div className='flex gap-2'>
                                    <Button type='primary' size='small'>Edit This Task</Button>
                                    <Button onClick={markAsCompleted} disabled={task.markedCompleted} type='primary' size='small'>Mark As Completed</Button>
                                </div>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    )
}

const ProjectTasksDisplay = ({ tasks }) => {

    if (tasks.length === 0) {
        return <Typography.Text type='danger'>Nothing found!</Typography.Text>
    }

    return (
        <div className='flex flex-col gap-6'>
            {tasks.sort((a, b) => b.deadline - a.deadline).map(task => <ProjectTask key={task.id} task={task} />)}
        </div>
    );
};

export default ProjectTasksDisplay;