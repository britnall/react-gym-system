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
@Table(name = "equipment_group")
public class Equipment {
	@Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private Integer quantity;
    //private Integer picture;
}