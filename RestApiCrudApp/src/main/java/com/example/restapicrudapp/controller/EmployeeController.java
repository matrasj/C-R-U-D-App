package com.example.restapicrudapp.controller;

import com.example.restapicrudapp.model.Employee;
import com.example.restapicrudapp.model.EmployeeDTO;
import com.example.restapicrudapp.serivce.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.lang.reflect.InvocationTargetException;
import java.util.Set;

@RestController
public class EmployeeController {
    public static Long EMPTY_ID = null;
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/employees")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping("/employees/{id}")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity getEmployee(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }

    @GetMapping("/employees/findByFirstName")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity getEmployeesByFirstName(@RequestParam String firstName) {
        return employeeService.getEmployeesByFirstNameIgnoreCase(firstName);
    }

    @GetMapping("/employees/findByLastName")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity getEmployeesByLastName(@RequestParam String lastName) {
        return employeeService.getEmployeesByLastNameIgnoreCase(lastName);
    }

    @GetMapping("/employees/findBySalary")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity getEmployeesBySalary(@RequestParam Double salary,
                                               @RequestParam Double limit) {
        return employeeService.getEmployeesBySalaryWithLimit(salary, limit);
    }
    @PostMapping("/employees")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        return employeeService.createEmployee(new Employee(
                EMPTY_ID,
                employeeDTO.getFirstName(),
                employeeDTO.getLastName(),
                employeeDTO.getSalary(),
                employeeDTO.getMale()
        ));
    }

    @PutMapping("/employees/{id}")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity updateEmployee(@RequestBody EmployeeDTO employeeDTO, @PathVariable Long id) throws InvocationTargetException, IllegalAccessException {
        return employeeService.updateEmployee(new Employee(
                id,
                employeeDTO.getFirstName(),
                employeeDTO.getLastName(),
                employeeDTO.getSalary(),
                employeeDTO.getMale()
        ));
    }

    @DeleteMapping("/employees/{id}")
    @CrossOrigin("http://127.0.0.1:5500/")
    public ResponseEntity deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).
                build();

    }
}
