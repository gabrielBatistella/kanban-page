'use client';

import { useState, useEffect, useRef } from "react";
import { BsArrowReturnRight, BsCalendar, BsArchive, BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

import { type Task } from "@/lib/types/task";

import MemberPic from "@/components/kanban/MemberPic";

type KanbanCardProps = {
  task: Task;
}

export default function KanbanCard(props: KanbanCardProps) {
  let upperBarColorClass = "bg-priority-blank";
  let middleBarColorClass = "bg-priority-blank";
  let bottomBarColorClass = "bg-priority-blank";
  if (props.task.priority === "high") {
    upperBarColorClass = "bg-priority-high";
    middleBarColorClass = "bg-priority-high";
    bottomBarColorClass = "bg-priority-high";
  }
  else if (props.task.priority === "medium") {
    middleBarColorClass = "bg-priority-medium";
    bottomBarColorClass = "bg-priority-medium";
  }
  else {
    bottomBarColorClass = "bg-priority-low";
  }

  let deadlineTagColorClass: string;
  let deadlineTagText: string;
  if (props.task.status === "finished") {
    deadlineTagColorClass = "bg-deadline-finished";
    deadlineTagText = "Concluída";
  }
  else {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dueDate = new Date(props.task.dueDate.getTime()); dueDate.setHours(0, 0, 0, 0);
    const daysRemaining = (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    if (daysRemaining > 1) {
      deadlineTagColorClass = "bg-deadline-distant";
      deadlineTagText = `${daysRemaining} dias (${dueDate.toLocaleDateString().slice(0, 5)})`;
    }
    else if (daysRemaining === 1) {
      deadlineTagColorClass = "bg-deadline-close";
      deadlineTagText = `Amanhã (${dueDate.toLocaleDateString().slice(0, 5)})`;
    }
    else if (daysRemaining === 0) {
      const hoursRemaining = (props.task.dueDate.getTime() - new Date().getTime()) / (1000 * 3600);
      if (hoursRemaining >= 0) {
        deadlineTagColorClass = "bg-deadline-close";
        deadlineTagText = `Hoje ${props.task.dueDate.toLocaleTimeString().slice(0, 5).replace(":", "h")}`;
      }
      else {
        deadlineTagColorClass = "bg-deadline-late";
        deadlineTagText = `[Atrasado] Hoje ${props.task.dueDate.toLocaleTimeString().slice(0, 5).replace(":", "h")}`;
      }
    }
    else {
      deadlineTagColorClass = "bg-deadline-late";
      deadlineTagText = `[Atrasado] ${daysRemaining} dias (${dueDate.toLocaleDateString().slice(0, 5)})`;
    }
  }

  const cardRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const element = cardRef.current;
    invariant(element);

    return draggable({
      element: element,
      onDrag: () => {
        setDragging(true);
      },
      onDrop: () => {
        setDragging(false);
      },
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCollapsed(false);
      },
      getInitialData: () => {
        return { id: props.task.id, status: props.task.status };
      },
    });
  }, []);

  return (
    <div className={`w-full min-w-72 relative flex ${dragging ? "opacity-40" : "opacity-100"}`}>
      <div ref={cardRef} className="flex flex-1 flex-col px-4 py-2 rounded-md bg-background shadow-md cursor-grab hover:bg-background-focus active:bg-background-focus active:drop-shadow-lg active:cursor-grabbing">
        <div className="h-full w-2 absolute flex flex-col gap-0.5 top-0 left-0">
          <div className={`flex flex-1 rounded-tl-md ${upperBarColorClass}`} />
          <div className={`flex flex-1 ${middleBarColorClass}`} />
          <div className={`flex flex-1 rounded-bl-md ${bottomBarColorClass}`} />
        </div>

        {collapsed
          ? (
            <>
              <h3 className="text-md ml-1">
                {props.task.description}
              </h3>

              <div className="flex flex-row gap-1 ml-2 items-center">
                <MemberPic member={props.task.requester} size={18} />
                <span className="-ml-2">
                  <MemberPic member={props.task.responsible} size={18} />
                </span>
                <span className="mb-1 text-lg text-tertiary">
                  |
                </span>
                <div className={`w-fit flex flex-row gap-1.5 px-2 py-1 items-center rounded-full ${deadlineTagColorClass}`}>
                  <BsCalendar size={14} />
                  <span className="text-xs whitespace-nowrap">
                    {deadlineTagText}
                  </span>
                </div>
              </div>
            </>
          )
          : (
            <>
              <h3 className="text-md font-bold ml-1">
                {props.task.description}
              </h3>

              <div className="flex flex-row gap-1 ml-2 mb-1 items-center">
                <BsArrowReturnRight size={16} />
                <span className="text-sm">
                  {props.task.details}
                </span>
              </div>

              <div className="flex flex-row gap-2 ml-4 mb-2 items-center">
                <BsArchive size={14} className="text-tertiary" />
                <span className="text-xs text-secondary">
                  {props.task.project}
                </span>
              </div>

              <div className="flex flex-row gap-1 ml-4 items-center">
                <MemberPic member={props.task.requester} size={18} />
                <span className="text-xs text-secondary">
                  {props.task.requester.firstName}
                </span>
                <BsArrowRight size={16} className="text-tertiary mx-1" />
                <MemberPic member={props.task.responsible} size={18} />
                <span className="text-xs text-secondary">
                  {props.task.responsible.firstName}
                </span>
              </div>

              <div className={`w-fit flex flex-row gap-2 mt-2 ml-2.5 px-2 py-1 items-center rounded-full ${deadlineTagColorClass}`}>
                <BsCalendar size={14} />
                <span className="text-xs whitespace-nowrap">
                  {deadlineTagText}
                </span>
              </div>
            </>
          )
        }
      </div>

      <div className="absolute bottom-0 right-0 justify-center content-center px-2 py-1 m-1 aspect-square rounded-full cursor-pointer hover:bg-background-focus" onClick={() => setCollapsed((previous) => !previous)}>
        {collapsed
          ? (
            <BsChevronDown size={18} className="text-secondary" />
          )
          : (
            <BsChevronUp size={18} className="text-secondary" />
          )
        }
      </div>
    </div>
  );
}