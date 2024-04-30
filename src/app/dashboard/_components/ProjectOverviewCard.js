import React from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const { Meta } = Card;

const ProjectOverviewCard = ({ project }) => {
    const router = useRouter();
    const goToProjectPage = () => router.push(`/dashboard/projects/${project.id}`);

    return (
        <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3 flex'>
            <Card
                className='flex flex-col justify-between'
                hoverable
                cover={
                    <Image
                        alt={project.name}
                        src={project.thumb}
                        width={300.22}
                        height={168.86}
                        onClick={goToProjectPage}
                    />
                }
                actions={[
                    <EyeOutlined key="view" onClick={goToProjectPage} />,
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />,
                ]}
            >
                <Meta
                    // className='flex-1'
                    avatar={<Avatar src={`https://ucarecdn.com/f9238824-18b3-4ea9-b2d0-a6d5064b6563/-/preview/100x100/`} />}
                    title={project.name}
                    description={project.short_description}
                />
            </Card>
        </div>
    )
};
export default ProjectOverviewCard;