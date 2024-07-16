'use server';

import { revalidatePath } from "next/cache";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { type Task, type TaskDbModel, type TaskStatus } from "@/lib/types/task";
import { type Member } from "@/lib/types/member";
import { fetchMembers } from "@/lib/queries/member";

const dbPath = path.join(process.cwd(), "src/database/tasks.json");

async function readTasks() {
  const jsonData = await readFile(dbPath, 'utf-8');
  return JSON.parse(jsonData) as TaskDbModel[];
}

async function writeTasks(data: TaskDbModel[]) {
  const jsonData = JSON.stringify(data);
  await writeFile(dbPath, jsonData, 'utf-8');
}

export async function switchTaskStatus(id: number, status: TaskStatus) {
  const tasksFromDb: TaskDbModel[] = await readTasks();

  const index = tasksFromDb.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasksFromDb[index] = { ...tasksFromDb[index], status: status };
  }

  await writeTasks(tasksFromDb);
  revalidatePath("/");
}

// export async function addTask(task: Omit<TaskModel, "id">) {
//   tasks.push({ id: tasks[tasks.length - 1].id + 1, ...task });
// }

// export async function updateTask(id: number, taskChanges: Partial<Omit<TaskModel, "id">>) {
//   const index = tasks.findIndex((task) => task.id === id);
//   if (index !== -1) {
//     tasks[index] = { ...tasks[index], ...taskChanges };
//   }
// }

// export async function deleteTask(id: number) {
//   tasks = tasks.filter((task) => task.id !== id);
// }
