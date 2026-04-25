export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  completionDates: string[];
  streak: number;
}
