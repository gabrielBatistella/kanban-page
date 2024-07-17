'use client';

import { useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { type Task, type TaskStatus } from "@/lib/types/task";
import { switchTaskStatus } from "@/lib/actions/task";

import KanbanColumn from "@/components/kanban/KanbanColumn";

type KanbanBoardProps = {
  tasks: Task[];
}

export default function KanbanBoard(props: KanbanBoardProps) {
  const taskColumns = props.tasks.reduce((acc, task) => {
    acc[task.status].push(task);
    return acc;
  }, { "to-do": [], "in-progress": [], "finished": [] } as { [key in TaskStatus]: Task[] });

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const dropColumn = location.current.dropTargets[0];
        if (!dropColumn) {
          return;
        }
        const taskId = source.data.id as number;
        const columnStatus = dropColumn.data.status as TaskStatus;
        switchTaskStatus(taskId, columnStatus);
      },
    });
  }, []);

  return (
    <div className="w-full flex flex-row gap-4 justify-center items-start">
      <KanbanColumn label="Não iniciado" status="to-do" tasks={taskColumns["to-do"]} />
      <KanbanColumn label="Iniciado" status="in-progress" tasks={taskColumns["in-progress"]} />
      <KanbanColumn label="Concluído" status="finished" tasks={taskColumns["finished"]} />
    </div>
  );
}
