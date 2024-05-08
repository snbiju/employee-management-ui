import React, { useState, useEffect, useCallback, useMemo } from "react";
import { EmployeeService } from "../services/EmployeeService";
import { Department } from "../models/Department";
import { Employee } from "../models/Employee";
import "../EmployeeManagement.css";
import Pagination from "./Pagination";
import Filters from "./Filters";
import EmployeeTable from "./EmployeeTable";

const EmployeeManagement: React.FC = () => {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [salaryFilter, setSalaryFilter] = useState<string>("all");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(5);

  const employeeService = useMemo(() => new EmployeeService(), []);

  // Fetch departments
  const fetchDepartments = useCallback(async () => {
    try {
      console.log("Fetching departments...");
      const data = await employeeService.getDepartments();
      setDepartments(data);
      console.log("Departments fetched:", data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, [employeeService]);

  // Fetch employees based on filters
  const fetchEmployees = useCallback(async () => {
    try {
      console.log("Fetching employees...");
      let data: Employee[] = departmentName
        ? await employeeService.getEmployeesByDepartment(departmentName)
        : await employeeService.getAllEmployees();

      // Apply salary filters
      data = applySalaryFilter(data, salaryFilter);

      setEmployees(data);
      console.log("Employees fetched:", data);

      // Adjust current page if necessary
      const totalPages = Math.ceil(data.length / recordsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [
    departmentName,
    salaryFilter,
    employeeService,
    currentPage,
    recordsPerPage,
  ]);

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, [departmentName, salaryFilter, fetchDepartments, fetchEmployees]);

  // Apply salary filter to employees
  const applySalaryFilter = (
    data: Employee[],
    salaryFilter: string
  ): Employee[] => {
    switch (salaryFilter) {
      case "<10k":
        return data.filter((employee) => employee.salary < 10000);
      case ">10k":
        return data.filter((employee) => employee.salary > 10000);
      default:
        return data;
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Ensure `employees` is always an array and not undefined
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(employees.length / recordsPerPage);

  return (
    <div className="employee-management-container">
      <Filters
        departmentName={departmentName}
        departments={departments}
        onDepartmentChange={setDepartmentName}
        salaryFilter={salaryFilter}
        onSalaryFilterChange={setSalaryFilter}
        onClearFilters={() => {
          setDepartmentName("");
          setSalaryFilter("all");
        }}
      />
      <EmployeeTable employees={currentRecords} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeManagement;
