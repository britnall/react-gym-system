package com.okta.developer.gymsystem.web;

import com.okta.developer.gymsystem.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class ExerciseController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private ExerciseRepository exerciseRepository;

    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping("/exercises")
    Collection<Exercise> exercises() {
        return exerciseRepository.findAll();
    }

    @GetMapping("/exercise/{id}")
    ResponseEntity<?> getExercise(@PathVariable Long id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        return exercise.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/exercise")
    ResponseEntity<Exercise> createExercise(@Valid @RequestBody Exercise exercise) throws URISyntaxException {
        log.info("Request to create exercise: {}", exercise);
        Exercise result = exerciseRepository.save(exercise);
        return ResponseEntity.created(new URI("/api/exercises/" + result.getId()))
                .body(result);
    }

    @PutMapping("/exercise")
    ResponseEntity<Exercise> updateExercise(@Valid @RequestBody Exercise exercise) {
        log.info("Request to update exercise: {}", exercise);
        Exercise result = exerciseRepository.save(exercise);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/exercise/{id}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long id) {
        log.info("Request to delete exercise: {}", id);
        exerciseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}