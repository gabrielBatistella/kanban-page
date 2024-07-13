export type Task = {
  id: number;
  description: string;
  project: string;
  requesterId: number;
  responsibleId: number;
  dueDate: Date;
  priority: 1 | 2 | 3;
  viewedBy: number[];
}

let tasks: Task[] = [
  
];
  
export function getTasks() {
  return tasks;
}

export function getTaskById(id: number) {
  return tasks.find((task) => task.id === id);
}

export function addTask(task: Omit<Task, "id">) {
  tasks.push({ id: tasks[tasks.length - 1].id + 1, ...task });
}

export function updateAnimal(id: number, taskChanges: Partial<Omit<Task, "id">>) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...taskChanges };
  }
}

export function deleteAnimal(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
}