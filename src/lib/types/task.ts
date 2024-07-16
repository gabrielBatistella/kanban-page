import { type Member } from "@/lib/types/member";

export type PriorityLevel = "low" | "medium" | "high";
export function priorityOrder(priority: PriorityLevel) {
  switch (priority) {
    case "low": return 1
    case "medium": return 2
    case "high": return 3
  }
}

export type TaskStatus = "to-do" | "in-progress" | "finished";
export function statusOrder(status: TaskStatus) {
  switch (status) {
    case "to-do": return 1
    case "in-progress": return 2
    case "finished": return 3
  }
}

export type Task = {
  id: number;
  description: string;
  details: string;
  project: string;
  requester: Member;
  responsible: Member;
  dueDate: Date;
  priority: PriorityLevel;
  status: TaskStatus;
}

export type TaskDbModel = {
  id: number;
  description: string;
  details: string;
  project: string;
  requesterId: number;
  responsibleId: number;
  dueDate: string;
  priority: PriorityLevel;
  status: TaskStatus;
}