package com.okta.developer.gymsystem.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByName(String name);
}
