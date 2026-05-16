import React, {createContext,useState, useContext} from "react";

export interface Task {
    id: string;
    title: string;
    subTitle: string;
    groupName: 'Work' | 'Study' | 'Kids' | 'Home';
    progress: number;
    isCompleted: boolean;
}

interface AppContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTaskProgress: (id: string, progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC <{ children: React.ReactNode}> =({children}) => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: '1', title: 'Finish layot', subTitle: 'Fix home screen tasks', groupName: 'Work', progress: 45, isCompleted: false},
        {id: '2', title: 'Prepare for exam', subTitle: 'Learn new concepts', groupName: 'Study', progress: 20, isCompleted: false},
        {id: '3', title: 'Buy toys', subTitle: 'Check online stores', groupName: 'Kids', progress: 80, isCompleted: false},
        
    ]);

    const addTask = (NewTask: Omit<Task, 'id'>) => {
        const taskWithId = { ...NewTask, id: Date.now().toString() };
        setTasks(prevTasks => [...prevTasks, taskWithId]);
    };

    const updateTaskProgress = (id: string, progress: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, progress, isCompleted: progress === 100 } : task
      )
    );
  };

  return (
    <AppContext.Provider value={{ tasks, addTask, updateTaskProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

