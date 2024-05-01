import { create } from 'zustand';

const useTasksStore = create((set) => ({
    tasks: [],
    setTasks: (allTasks) => set({ tasks: allTasks }),
    addNewTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
    deleteTask: (deleteId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== deleteId) })),
    updateTask: (updatedTask) => set((state) => {
        const remains = state.tasks.filter(task => task.id !== updatedTask.id);
        return { tasks: [...remains, updatedTask] }
    })
}));

export default useTasksStore;