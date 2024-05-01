'use client';
import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop, markedCompleted }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK_BUTTON',
        drop: (item, monitor) => {
            onDrop(item.status); // Call onDrop callback with the status value
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const backgroundColor = isOver ? '#c6f6d5' : '#ffffff';

    return (
        <div ref={drop} style={{ backgroundColor }} className='h-32 flex justify-center items-center text-gray-400'>
            {markedCompleted ? 'This task is marked completed' : 'Drop here to update task status'}
        </div>
    );
};

export default DroppableArea;