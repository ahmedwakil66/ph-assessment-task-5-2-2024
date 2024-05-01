import useTasksStore from '@/store/useTasksStore';
import useTeamMembersStore from '@/store/useTeamMembersStore';
import { useEffect } from 'react';

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