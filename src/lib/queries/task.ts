import 'server-only';

import { unstable_noStore as noStore } from "next/cache";
import { readFile } from 'fs/promises';
import path from 'path';

import { type Task, type TaskDbModel, type PriorityLevel, priorityOrder } from "@/lib/types/task";
import { type Member } from "@/lib/types/member";
import { fetchMembers } from "@/lib/queries/member";

const dbPath = path.join(process.cwd(), "src/database/tasks.json");

async function readTasks() {
  const jsonData = await readFile(dbPath, 'utf-8');
  return JSON.parse(jsonData) as TaskDbModel[];
}

export async function fetchTasks() {
  noStore();

  const [tasksFromDb, membersFromDb]: [TaskDbModel[], Member[]] = await Promise.all([
    readTasks(),
    fetchMembers(),
  ]);
  const tasksFormatted: Task[] = tasksFromDb
    .map((task) => ({
      id: task.id,
      description: task.description,
      details: task.details,
      project: task.project,
      requester: membersFromDb.find((member) => member.id === task.requesterId)!,
      responsible: membersFromDb.find((member) => member.id === task.responsibleId)!,
      dueDate: new Date(task.dueDate),
      priority: task.priority,
      status: task.status,
    }))
    .sort((task1, task2) =>
      (task1.dueDate.getTime() - task2.dueDate.getTime())
      || -(priorityOrder(task1.priority) - priorityOrder(task2.priority))
    );

  return tasksFormatted;
}

export async function fetchTasksFiltered(search?: string, requesterId?: number, responsibleId?: number, project?: string, priority?: PriorityLevel) {
  noStore();

  const [tasksFromDb, membersFromDb]: [TaskDbModel[], Member[]] = await Promise.all([
    readTasks(),
    fetchMembers(),
  ]);
  const tasksFormatted: Task[] = tasksFromDb
    .filter((task) =>
      (search === undefined || task.description.includes(search) || task.details.includes(search))
      && (requesterId === undefined || task.requesterId === requesterId)
      && (responsibleId === undefined || task.responsibleId === responsibleId)
      && (project === undefined || task.project === project)
      && (priority === undefined || task.priority === priority)
    )
    .map((task) => ({
      id: task.id,
      description: task.description,
      details: task.details,
      project: task.project,
      requester: membersFromDb.find((member) => member.id === task.requesterId)!,
      responsible: membersFromDb.find((member) => member.id === task.responsibleId)!,
      dueDate: new Date(task.dueDate),
      priority: task.priority,
      status: task.status,
    }))
    .sort((task1, task2) =>
      (task1.dueDate.getTime() - task2.dueDate.getTime())
      || -(priorityOrder(task1.priority) - priorityOrder(task2.priority))
    );

  return tasksFormatted;
}