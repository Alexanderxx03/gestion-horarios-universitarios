export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  weeklyHours: number;
  requiresLab: boolean;
  prerequisites: string[];
  maxCapacity: number;
  isActive: boolean;
  careerId: string;
  semester: number;
}
