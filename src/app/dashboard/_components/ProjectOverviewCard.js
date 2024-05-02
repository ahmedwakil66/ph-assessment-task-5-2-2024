import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Alert, Avatar, Card, Modal, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
const { Meta } = Card;

const mockDelete = () => new Promise((resolve) => setTimeout(resolve, 1000));

// This component is the project overview card with view, edit and
// delete buttons. View button takes user to the project detail page
// delete button deletes the project after confirmation
// edit button does not do anything at this moment

const ProjectOverviewCard = ({ project }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [delProjectId, setDelProjectId] = useState(null);

    const mutation = useMutation(mockDelete, {
        onSuccess: () => {
            queryClient.setQueryData('projects', (oldData) => ({
                status: 'success',
                data: oldData.data.filter(oldProject => oldProject.id !== delProjectId),
            }))
        }
    })

    const closeModal = () => setDelProjectId(null);
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
                    <Tooltip key="View" title="View">
                        <EyeOutlined onClick={goToProjectPage} />
                    </Tooltip>,
                    <Tooltip key="edit" title="Edit">
                        <EditOutlined />
                    </Tooltip>,
                    <Tooltip key="delete" title="Delete">
                       <DeleteOutlined onClick={() => setDelProjectId(project.id)} />
                    </Tooltip>,
                ]}
            >
                <Meta
                    avatar={<Avatar src={`https://ucarecdn.com/f9238824-18b3-4ea9-b2d0-a6d5064b6563/-/preview/100x100/`} />}
                    title={project.name}
                    description={project.short_description}
                />
            </Card>

            <Modal
                title={`Do you really want to delete ${project.name}?`}
                okText="Delete"
                okType='danger'
                closeIcon={null}
                open={delProjectId}
                onOk={() => mutation.mutate()}
                onCancel={closeModal}
                maskClosable={false}
                okButtonProps={{ disabled: mutation.isLoading }}
                cancelButtonProps={{ disabled: mutation.isLoading }}
            >
                <br />
                <Alert
                    message="Warning"
                    description="Deleting is only for mocking purpose. If you reload this page or take any action that cause a refetch, your action will be reverted!"
                    type="warning"
                    showIcon
                />
            </Modal>
        </div>
    )
};
export default ProjectOverviewCard;