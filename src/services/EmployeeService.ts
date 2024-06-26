import axios from "axios";
import { Employee } from "../models/Employee";
import { Department } from "../models/Department";

export class EmployeeService {
  // Using the environment variable for the base URL
  private baseUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;

  // Helper function to handle API requests
  private async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await axios.get<T>(url);
      console.log("Fetched data:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Network error:", error.message);
        console.error("Error config:", error.config);
        console.error("Error response:", error.response);
        console.error("Error code:", error.code);
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  }

  // Method to fetch employees by department name
  async getEmployeesByDepartment(departmentName: string): Promise<Employee[]> {
    const url = `${this.baseUrl}/department/${departmentName}`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  // Method to fetch employees earning less than a certain amount
  async getEmployeesBySalaryLessThan(salary: number): Promise<Employee[]> {
    const url = `${this.baseUrl}/salary/${salary}?condition=lessThan`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  // Method to fetch employees earning more than a certain amount
  async getEmployeesBySalaryGreaterThan(salary: number): Promise<Employee[]> {
    const url = `${this.baseUrl}/salary/${salary}?condition=greaterThan`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  // Method to fetch all employees
  async getAllEmployees(): Promise<Employee[]> {
    const url = `${this.baseUrl}`;
    const data = await this.fetchData<Employee[]>(url);
    return data ?? [];
  }

  // Method to fetch all departments
  async getDepartments(): Promise<Department[]> {
    const url = `${this.baseUrl}/department`;
    const data = await this.fetchData<Department[]>(url);
    return data ?? [];
  }
}
