package com.example.restapicrudapp.repository;

import com.example.restapicrudapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByFirstNameIgnoreCase(@Param("firstName") String firstName);
    List<Employee> findByLastNameIgnoreCase(@Param("lastName") String lastName);
    @Query(value = "SELECT * FROM employees WHERE employees.salary <= (:salary + :limit) " +
            "AND employees.salary >= (:salary - :limit )", nativeQuery = true)
    List<Employee> findBySalaryWithLimit(@Param("salary") Double salary, @Param("limit") Double limit);
}
