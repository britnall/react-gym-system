package com.okta.developer.gymsystem.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class User {
	@Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String insurance;
    private String username;
    private String password;
    private String userType;
    private String activeStatus;
}