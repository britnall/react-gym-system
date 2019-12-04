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
@Table(name = "exercise_group")
public class Exercise {
	@Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private Integer numReps;
    private Integer numSets;
}