'use server';

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { type TaskDbModel, type PriorityLevel, type TaskStatus } from "@/lib/types/task";

const dbPath = path.join(process.cwd(), "src/database/tasks.json");

async function readTasks() {
  const jsonData = await readFile(dbPath, 'utf-8');
  return JSON.parse(jsonData) as TaskDbModel[];
}

async function writeTasks(data: TaskDbModel[]) {
  const jsonData = JSON.stringify(data);
  await writeFile(dbPath, jsonData, 'utf-8');
}

export async function createNewTask(formData: FormData) {
  const tasksFromDb: TaskDbModel[] = await readTasks();

  const newTask: TaskDbModel = {
    id: tasksFromDb[tasksFromDb.length - 1].id + 1,
    description: formData.get("description") as string,
    details: formData.get("details") as string,
    project: formData.get("project") as string,
    requesterId: parseInt(formData.get("requesterId") as string),
    responsibleId: parseInt(formData.get("responsibleId") as string),
    dueDate: `${formData.get("dueDate") as string}T12:00:00.000-03:00`,
    priority: formData.get("priority") as PriorityLevel,
    status: "to-do",
  }
  tasksFromDb.push(newTask);

  await writeTasks(tasksFromDb);
  revalidatePath("/");
  redirect("/");
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
