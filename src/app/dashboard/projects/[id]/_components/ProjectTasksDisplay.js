import useTeamMembersStore from '@/store/useTeamMembersStore';
import { Avatar, List, Tabs, Typography } from 'antd';
const { Text } = Typography;

const ProjectTask = ({ task }) => {
    const teamMembers = useTeamMembersStore((state) => state.members);
    const assignees = teamMembers.filter(member => task.assignees.indexOf(member.id) !== -1);

    return (
        <div className='shadow-md p-3 rounded-lg bg-slate-200'>
            <Typography.Title level={5}>
                {task.title}. &nbsp; #<Text copyable>{task.id}</Text>
            </Typography.Title>
            <Tabs
                defaultActiveKey='1'
                items={[
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
                                    <Text>{task.status}</Text>
                                </div>
                                <div className='mt-2'>
                                    <Text className='font-semibold'>Deadline: </Text>
                                    {new Date(task.deadline).toLocaleString().split(',')[1]},&nbsp;
                                    {new Date(task.deadline).toDateString()}
                                </div>
                            </>
                        )
                    },
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