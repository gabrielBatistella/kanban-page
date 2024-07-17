import { type Task, type PriorityLevel } from "@/lib/types/task";
import { fetchTasksFiltered } from "@/lib/queries/task";

import KanbanBoard from "@/components/kanban/KanbanBoard";
import FilterFields from "@/components/filters/FilterFields";
import AddTaskButton from "@/components/add-new/AddTaskButton";

type HomeProps = {
  searchParams?: {
    search?: string;
    responsible?: string;
    requester?: string;
    project?: string;
    priority?: PriorityLevel;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const search = searchParams?.search;
  const requesterId = Number(searchParams?.requester) || undefined;
  const responsibleId = Number(searchParams?.responsible) || undefined;
  const project = searchParams?.project;
  const priority = searchParams?.priority;

  const tasks: Task[] = await fetchTasksFiltered(search, requesterId, responsibleId, project, priority);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex flex-row gap-8 items-stretch mb-5">
        <AddTaskButton />
        <FilterFields />
      </div>
      <KanbanBoard tasks={tasks} />
    </div>
  );
}
