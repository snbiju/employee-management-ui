import { Department } from "./Department";

export interface Employee {
  id: number;
  employeeName: string;
  department: Department;
  salary: number;
}
