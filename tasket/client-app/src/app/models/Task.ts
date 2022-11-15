export interface Task {
    id_task: string;
    title: string;
    is_finish: boolean;
    description: string;
    end_date_scheduled: Date | null;
    end_date_actual: Date | null;
  }