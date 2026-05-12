export type EnrollmentStatus = 'PENDING' | 'VALIDATED' | 'REJECTED';

export interface SelectedCourse {
  courseId: string;
  courseName: string;
  credits: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  periodId: string;
  status: EnrollmentStatus;
  selectedCourses: SelectedCourse[];
  totalCredits: number;
  createdAt: string;
}
