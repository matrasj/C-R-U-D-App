package com.example.restapicrudapp.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Employees")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Double salary;
    private Boolean male;
}
