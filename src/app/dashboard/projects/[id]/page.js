'use client';
import { Avatar, List, Typography } from 'antd';
import { useQuery } from 'react-query';
import Image from 'next/image';
import ProjectRecentActivities from './_components/ProjectRecentActivities';
import ProjectTasks from './_components/ProjectTasks';
import SetInitialTasks from './_components/SetInitialTasks';

const fetcher = async (id) => {
    const response = await fetch(`/api/data?projectId=${id}`);
    return response.json();
}

const ProjectDetailsPage = ({ params }) => {
    const { isLoading, isError, data } = useQuery(
        ['projects', params.id],
        () => fetcher(params.id),
        { staleTime: 3600000, cacheTime: 3600000 }
    );

    if (isLoading) return <p>Loading...</p>
    if (isError || (data && data.status !== 'success')) return <p>Error fetching data</p>

    const { name, thumb, description, technologies, other_technologies, teamMembers, tasks, recentActivities } = data.data;

    return (
        <div className='max-w-3xl mx-auto'>
            <Typography.Title level={2} className='text-center'>
                {name}
            </Typography.Title>

            <br />

            <Image
                alt={name}
                src={thumb}
                width={1280}
                height={720}
                priority
            />

            <br />

            <Typography.Title level={4}>
                What is this project about?
            </Typography.Title>
            <Typography.Text>{description}</Typography.Text>

            <Typography.Title level={4}>
                What technologies should we use?
            </Typography.Title>
            <Typography.Text>{technologies.join(', ')}, {other_technologies}.</Typography.Text>

            {/* Team Members */}
            <Typography.Title level={4}>
                Available team members
            </Typography.Title>
            <List
                itemLayout="horizontal"
                dataSource={teamMembers}
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

            {/* Project Tasks */}
            <br />
            <Typography.Title level={4}>
                Project Tasks
            </Typography.Title>
            <SetInitialTasks initialTasks={tasks} teamMembers={teamMembers}/>
            <ProjectTasks defaultTasks={tasks} />

            {/* Recent Activities */}
            <br />
            <ProjectRecentActivities recentActivities={recentActivities} />


        </div>
    );
};

export default ProjectDetailsPage;