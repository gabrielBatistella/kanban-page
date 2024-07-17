import { type Task, type PriorityLevel } from "@/lib/types/task";
import { fetchTasksFiltered } from "@/lib/queries/task";

import KanbanBoard from "@/components/KanbanBoard";
import FilterFields from "@/components/FilterFields";

type RootProps = {
  searchParams?: {
    search?: string;
    responsible?: string;
    requester?: string;
    project?: string;
    priority?: PriorityLevel;
  };
}

export default async function Home({ searchParams }: RootProps) {
  const search = searchParams?.search;
  const requesterId = Number(searchParams?.requester) || undefined;
  const responsibleId = Number(searchParams?.responsible) || undefined;
  const project = searchParams?.project;
  const priority = searchParams?.priority;

  const tasks: Task[] = await fetchTasksFiltered(search, requesterId, responsibleId, project, priority);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex flex-row gap-4 justify-between items-center mb-5">
        <FilterFields />
      </div>
      <KanbanBoard tasks={tasks} />
    </div>
  );
}
