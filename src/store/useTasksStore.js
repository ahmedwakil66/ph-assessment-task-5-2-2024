import { create } from 'zustand';

const useTasksStore = create((set) => ({
    tasks: [],
    setTasks: (allTasks) => set({ tasks: allTasks }),
    addNewTask: (newTask) => set((state) => ([...state.tasks, newTask])),
    deleteTask: (deleteId) => set((state) => state.tasks.filter(task => task.id !== deleteId)),
}));

export default useTasksStore;