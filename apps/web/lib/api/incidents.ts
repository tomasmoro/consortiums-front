import type { Incident } from '@condoflow/types';
import { mockIncidents } from './mock-data';

function delay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let incidents = [...mockIncidents];

export async function getIncidents(consortiumId: string): Promise<Incident[]> {
  await delay();
  return incidents.filter((i) => i.consortiumId === consortiumId);
}

export async function getIncident(id: string): Promise<Incident | null> {
  await delay(300);
  return incidents.find((i) => i.id === id) ?? null;
}

export async function createIncident(
  data: Omit<Incident, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments'>,
): Promise<Incident> {
  await delay(400);
  const incident: Incident = {
    ...data,
    id: `inc-${Date.now()}`,
    comments: [],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  incidents = [...incidents, incident];
  return incident;
}

export async function updateIncident(
  id: string,
  data: Partial<Incident>,
): Promise<Incident> {
  await delay(350);
  incidents = incidents.map((i) =>
    i.id === id ? { ...i, ...data, updatedAt: new Date().toISOString() } : i,
  );
  const updated = incidents.find((i) => i.id === id);
  if (!updated) throw new Error(`Incident ${id} not found`);
  return updated;
}

export async function deleteIncident(id: string): Promise<void> {
  await delay(300);
  incidents = incidents.filter((i) => i.id !== id);
}
