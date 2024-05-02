import useTasksStore from '@/store/useTasksStore';
import useTeamMembersStore from '@/store/useTeamMembersStore';
import { useEffect } from 'react';

// This component is responsible to assign tasks associated with
// a project to the store. Whenever a new project page is opened,
// it replaces previous store tasks with current project tasks.

const SetInitialTasks = ({initialTasks = [], teamMembers = []}) => {
    const setTasksToStore = useTasksStore((state) => state.setTasks);
    const setProjectMembersToStore = useTeamMembersStore((state) => state.setMembers);

    useEffect(() => {
        setTasksToStore(initialTasks);
        setProjectMembersToStore(teamMembers);
    }, [initialTasks, setProjectMembersToStore, setTasksToStore, teamMembers])

    return null;
};

export default SetInitialTasks;