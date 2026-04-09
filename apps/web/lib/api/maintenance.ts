import type { MaintenanceTask } from '@condoflow/types';
import { mockMaintenanceTasks } from './mock-data';

function delay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let tasks = [...mockMaintenanceTasks];

export async function getMaintenanceTasks(consortiumId: string): Promise<MaintenanceTask[]> {
  await delay();
  return tasks.filter((t) => t.consortiumId === consortiumId);
}

export async function getMaintenanceTask(id: string): Promise<MaintenanceTask | null> {
  await delay(300);
  return tasks.find((t) => t.id === id) ?? null;
}

export async function createMaintenanceTask(
  data: Omit<MaintenanceTask, 'id' | 'createdAt' | 'updatedAt' | 'history'>,
): Promise<MaintenanceTask> {
  await delay(400);
  const task: MaintenanceTask = {
    ...data,
    id: `mt-${Date.now()}`,
    history: [
      {
        id: `h-${Date.now()}`,
        taskId: `mt-${Date.now()}`,
        action: 'created',
        performedBy: data.reporterName,
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks = [...tasks, task];
  return task;
}

export async function updateMaintenanceTask(
  id: string,
  data: Partial<MaintenanceTask>,
): Promise<MaintenanceTask> {
  await delay(350);
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t,
  );
  const updated = tasks.find((t) => t.id === id);
  if (!updated) throw new Error(`Task ${id} not found`);
  return updated;
}

export async function deleteMaintenanceTask(id: string): Promise<void> {
  await delay(300);
  tasks = tasks.filter((t) => t.id !== id);
}
