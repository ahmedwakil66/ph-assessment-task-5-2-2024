'use client';
import React from 'react';
import { useQuery } from 'react-query';

import ProjectOverviewCard from './_components/ProjectOverviewCard'
import { Typography } from 'antd';

const fetcher = async() => {
    const response = await fetch('/api/data');
    return response.json();
}

const DashboardPage = () => {
    const {isLoading, isError, data} = useQuery('projects', fetcher, { staleTime: 3600000, cacheTime: 3600000 });

    return (
        <div>
            <Typography.Title level={2}>
                Overview Of All Projects
            </Typography.Title>
            {isLoading && <p>Loading</p>}
            {isError && <p>Error fetching data</p>}
            {data && data.status !== 'success' && <p>Error fetching data, inter server error</p>}
            {data && data.status === 'success' && (
                <div className='flex flex-wrap'>
                    {data.data.map(project => <ProjectOverviewCard key={project.id} project={project}/>)}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;