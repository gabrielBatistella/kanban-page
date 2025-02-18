'use client';

import { useState, useEffect, useRef } from "react";
import { BsBoxArrowInDownRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

import { type Task, type TaskStatus } from "@/lib/types/task";

import KanbanCard from "@/components/kanban/KanbanCard";

type KanbanColumnProps = {
  label: string;
  status: TaskStatus;
  tasks: Task[];
}

export default function KanbanColumn(props: KanbanColumnProps) {
  const boardColorClass = props.status === "finished"
    ? "bg-status-finished"
    : props.status === "in-progress"
      ? "bg-status-inprogress"
      : "bg-status-todo";

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tasksSeparatedByUrgency = props.tasks.reduce((acc, task) => {
    if (props.status === "finished") {
      acc["close"].push(task);
    }
    else {
      const dueDate = new Date(task.dueDate.getTime()); dueDate.setHours(0, 0, 0, 0);
      const daysRemaining = (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
      if (daysRemaining >= 7) {
        acc["distant"].push(task);
      }
      else {
        acc["close"].push(task);
      }
    }
    return acc;
  }, { "close": [], "distant": [] } as { [key in "close" | "distant"]: Task[] });

  const boardRef = useRef<HTMLDivElement>(null);

  const [showDistant, setShowDistant] = useState<boolean>(false);
  const [draggedOver, setDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const element = boardRef.current;
    invariant(element);

    return dropTargetForElements({
      element: element,
      canDrop: ({ source }) => {
        const taskStatus = source.data.status as TaskStatus;
        return taskStatus !== props.status;
      },
      onDragEnter: () => {
        setDraggedOver(true);
      },
      onDragLeave: () => {
        setDraggedOver(false);
      },
      onDrop: () => {
        setDraggedOver(false);
      },
      getData: () => {
        return { status: props.status };
      },
    });
  }, []);

  return (
    <div ref={boardRef} className={"w-full relative flex"}>
      <div className={`flex flex-1 flex-col gap-4 justify-center items-start px-4 py-3 rounded-md ${boardColorClass} shadow-inner`}>
        <h2 className="text-md font-bold -mb-2 ml-1">
          {props.label}
        </h2>

        {tasksSeparatedByUrgency["close"].map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}

        {props.status !== "finished" && (
          <>
            <div className="w-full flex flex-row justify-between items-center opacity-30">
              <hr className="h-0.5 flex-1 bg-primary" />

              <div className="flex flex-row mx-2 py-1 pl-2.5 pr-2 justify-between items-center gap-2 rounded-md border border-primary cursor-pointer hover:bg-background-focus" onClick={() => setShowDistant((previous) => !previous)}>
                <span className="text-sm">
                  Uma semana ou mais
                </span>
                <hr className="h-0.5 w-0.5 bg-primary" />
                <div className="flex flex-row justify-center items-center gap-2">
                  <span className="text-sm">
                    {tasksSeparatedByUrgency["distant"].length}
                  </span>
                  {!showDistant
                    ? (
                      <BsChevronDown size={18} className="text-primary" />
                    )
                    : (
                      <BsChevronUp size={18} className="text-primary" />
                    )
                  }
                </div>
              </div>

              <hr className="h-0.5 flex-1 bg-primary" />
            </div>

            {showDistant && (
              tasksSeparatedByUrgency["distant"].map((task) => (
                <KanbanCard key={task.id} task={task} />
              ))
            )}
          </>
        )}
      </div>

      {draggedOver && (
        <div className={`w-full h-full absolute flex justify-center items-center rounded-md ${boardColorClass} opacity-60`}>
          <BsBoxArrowInDownRight size={56} className="text-white" />
        </div>
      )}
    </div>
  );
}