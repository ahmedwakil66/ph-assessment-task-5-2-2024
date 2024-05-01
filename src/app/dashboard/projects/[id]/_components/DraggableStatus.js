'use client';
import { Button } from 'antd';
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableStatus = ({ status, currentStatus, markedCompleted }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK_BUTTON',
        item: { type: 'TASK_BUTTON', status },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <Button ref={drag} disabled={isDragging || status === currentStatus || markedCompleted} type='dashed'>
            {status}
        </Button>
    );
};

export default DraggableStatus;