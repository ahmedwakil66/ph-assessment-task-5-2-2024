import { List, Typography } from 'antd';
import React from 'react';

// This component shows all recent activities of a project

const ProjectRecentActivities = ({ recentActivities }) => {
    
    return (
        <>
            <Typography.Title level={4}>
                Recent Activities
            </Typography.Title>
            <List
                itemLayout="horizontal"
                dataSource={recentActivities.sort((a, b) => b.timestamp - a.timestamp)}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item.description}</p>}
                            description={`${new Date(item.timestamp).toLocaleString().split(',')[1]}, ${new Date(item.timestamp).toDateString()}.`}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default ProjectRecentActivities;