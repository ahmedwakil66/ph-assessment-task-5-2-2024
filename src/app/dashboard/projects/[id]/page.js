'use client';
import { Avatar, List, Typography } from 'antd';
import { useQuery } from 'react-query';
import Image from 'next/image';
import ProjectRecentActivities from './_components/ProjectRecentActivities';
import ProjectTasks from './_components/ProjectTasks';
import SetInitialTasks from './_components/SetInitialTasks';
import AddNewTask from './_components/AddNewTask';
import { memo } from 'react';

const fetcher = async (id) => {
    const response = await fetch(`/api/data?projectId=${id}`);
    return response.json();
}

// Given task rule: Implement a drag-and-drop feature to change the status of tasks 
// (e.g., To Do, In Progress, Done) using Zustand to manage state.
// Because of this rule, from here I will have to mix tanstack and zustand
// which might make the code complex and less performant.

const ProjectDetailsPage = memo(function ProjectDetailsPage ({ params }) {
    const { isLoading, isError, data } = useQuery(
        ['projects', params.id],
        () => fetcher(params.id),
        { staleTime: 3600000, cacheTime: 3600000 }
    );

    if (isLoading) return <p>Loading...</p>
    if (isError || (data && data.status !== 'success')) return (
        <Typography.Text type='danger'>Error fetching data</Typography.Text>
    )

    const { name, thumb, description, technologies, other_technologies, teamMembers, tasks, recentActivities } = data.data;

    return (
        <div className='max-w-3xl mx-auto'>
            {/* Project Name */}
            <Typography.Title level={2} className='text-center'>
                {name}
            </Typography.Title>

            <br />
            {/* Project Thumbnail */}
            <Image
                alt={name}
                src={thumb}
                width={1280}
                height={720}
                priority
            />

            <br />
            {/* Project Descriptions */}
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
            <div className='flex justify-between gap-5'>
                <Typography.Title level={4}>
                    Project Tasks
                </Typography.Title>
                <AddNewTask projectId={params.id} />
            </div>
            <SetInitialTasks initialTasks={tasks} teamMembers={teamMembers} />
            <ProjectTasks allTasks={tasks} projectId={params.id} />

            {/* Recent Activities */}
            <br /> <br />
            <ProjectRecentActivities recentActivities={recentActivities} />

        </div>
    );
})

export default ProjectDetailsPage;