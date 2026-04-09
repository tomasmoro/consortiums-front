export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical';
export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'structural'
  | 'cleaning'
  | 'security'
  | 'other';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface MaintenanceHistoryEntry {
  id: string;
  taskId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  note?: string;
}

export interface MaintenanceTask {
  id: string;
  consortiumId: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  category: MaintenanceCategory;
  assigneeId?: string;
  assigneeName?: string;
  reporterId: string;
  reporterName: string;
  unitId?: string;
  scheduledDate?: string;
  completedDate?: string;
  estimatedCost?: number;
  actualCost?: number;
  checklist: ChecklistItem[];
  history: MaintenanceHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}
