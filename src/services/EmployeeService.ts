import axios from "axios";
import { Employee } from "../models/Employee";
import { Department } from "../models/Department";

export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/employees";

  // Helper function to handle API requests
  private async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await axios.get<T>(url);
      console.log("Fetched data:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Network error:", error.message);
        // Log additional error details
        console.error("Error config:", error.config);
        console.error("Error response:", error.response);
        console.error("Error code:", error.code);
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  }

  async getEmployeesByDepartment(departmentName: string): Promise<Employee[]> {
    const url = `${this.baseUrl}/department/${departmentName}`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  async getEmployeesBySalaryLessThan(salary: number): Promise<Employee[]> {
    const url = `${this.baseUrl}/salary/${salary}?condition=lessThan`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  async getEmployeesBySalaryGreaterThan(salary: number): Promise<Employee[]> {
    const url = `${this.baseUrl}/salary/${salary}?condition=greaterThan`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  async getAllEmployees(): Promise<Employee[]> {
    const data = await this.fetchData<Employee[]>(this.baseUrl);
    return data ?? [];
  }

  async getDepartments(): Promise<Department[]> {
    const url = `${this.baseUrl}/department`;
    const data = await this.fetchData<Department[]>(url);
    return data ?? [];
  }
}
