import { create } from 'zustand';

const useTeamMembersStore = create((set) => ({
    members: [],
    setMembers: (allMembers) => set({ members: allMembers }),
}));

export default useTeamMembersStore;