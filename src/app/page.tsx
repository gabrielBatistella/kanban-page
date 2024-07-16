import { type Task } from "@/lib/types/task";
import { fetchTasks } from "@/lib/queries/task";

import KanbanBoard from "@/components/KanbanBoard";

export default async function Home() {
  const tasks: Task[] = await fetchTasks();

  return (
    <div className="flex flex-1 flex-row gap-4 justify-center items-start">
      <KanbanBoard tasks={tasks} />
    </div>
  );
}
