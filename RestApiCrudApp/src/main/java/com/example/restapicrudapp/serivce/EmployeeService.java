package com.example.restapicrudapp.serivce;

import com.example.restapicrudapp.controller.EmployeeController;
import com.example.restapicrudapp.model.Employee;
import com.example.restapicrudapp.repository.EmployeeRepository;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    BeanUtilsBean nullAwareBeanUtilsBean;

    public ResponseEntity getEmployees() {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(employeeRepository.findAll());
    }

    public ResponseEntity getEmployee(Long id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(employeeRepository.findById(id));
    }

    public ResponseEntity updateEmployee(Employee employee) throws InvocationTargetException, IllegalAccessException {
        try {
            Employee existingEmployee = employeeRepository.findById(employee.getId()).orElseThrow();
            nullAwareBeanUtilsBean.copyProperties(existingEmployee, employee);
            System.out.println(existingEmployee);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(employeeRepository.save(existingEmployee));

        } catch (NoSuchElementException noSuchElementException) {
            System.out.println("Error");
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(employeeRepository.save(employee));
        }
    }

    public ResponseEntity createEmployee(Employee employee) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public ResponseEntity getEmployeesByFirstNameIgnoreCase(String firstName) {
        List<Employee> existingEmployees = employeeRepository.findByFirstNameIgnoreCase(firstName);
        System.out.println(existingEmployees);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(existingEmployees);

    }

    public ResponseEntity getEmployeesByLastNameIgnoreCase(String lastName) {
        List<Employee> existingEmployees = employeeRepository.findByLastNameIgnoreCase(lastName);
        System.out.println(existingEmployees);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(existingEmployees);
    }


    public ResponseEntity getEmployeesBySalaryWithLimit(Double salary, Double limit) {
        List<Employee> existingEmployees = employeeRepository.findBySalaryWithLimit(salary, limit);
        System.out.println(existingEmployees);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(existingEmployees);
    }
}
