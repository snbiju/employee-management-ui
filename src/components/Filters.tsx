import React from "react";
import { Department } from "../models/Department";

interface FiltersProps {
  departmentName: string;
  departments: Department[];
  salaryFilter: string;
  onDepartmentChange: (value: string) => void;
  onSalaryFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  departmentName,
  departments,
  salaryFilter,
  onDepartmentChange,
  onSalaryFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="filters-container">
      <select
        value={departmentName}
        onChange={(e) => onDepartmentChange(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map((department) => (
          <option key={department.id} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>

      <div className="salary-filter-buttons">
        <button onClick={() => onSalaryFilterChange("all")}>All</button>
        <button onClick={() => onSalaryFilterChange("<10k")}>&lt;10k</button>
        <button onClick={() => onSalaryFilterChange(">10k")}>&gt;10k</button>
      </div>
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  );
};

export default Filters;
