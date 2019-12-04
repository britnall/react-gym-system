package com.okta.developer.gymsystem;

import com.okta.developer.gymsystem.model.Exercise;
import com.okta.developer.gymsystem.model.Equipment;
import com.okta.developer.gymsystem.model.EquipmentRepository;
import com.okta.developer.gymsystem.model.ExerciseRepository;
import com.okta.developer.gymsystem.model.User;
import com.okta.developer.gymsystem.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EquipmentRepository equipRepository;
    private final ExerciseRepository exercRepository;

    public Initializer(UserRepository userRepository, EquipmentRepository equipRepository,
                                ExerciseRepository exercRepository) {
        this.userRepository = userRepository;
        this.equipRepository = equipRepository;
        this.exercRepository = exercRepository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Brittany Nall", "Dave Billin", "Tim Westbrook").forEach(name ->
                userRepository.save(new User(name))
        );
        Stream.of("Barbells", "Bench", "Treadmill").forEach(name ->
                equipRepository.save(new Equipment(name))
        );

        Stream.of("Chest Press", "Curls", "Sprints").forEach(name ->
                exercRepository.save(new Exercise(name))
        );

        userRepository.findAll().forEach(System.out::println);
        equipRepository.findAll().forEach(System.out::println);
        exercRepository.findAll().forEach(System.out::println);
    }
}