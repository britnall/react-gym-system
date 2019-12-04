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
class EquipmentController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private EquipmentRepository equipmentRepository;

    public EquipmentController(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping("/equipments")
    Collection<Equipment> equipment() {
        return equipmentRepository.findAll();
    }

    @GetMapping("/equipment/{id}")
    ResponseEntity<?> getEquipment(@PathVariable Long id) {
        Optional<Equipment> equipment = equipmentRepository.findById(id);
        return equipment.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/equipment")
    ResponseEntity<Equipment> createEquipment(@Valid @RequestBody Equipment equipment) throws URISyntaxException {
        log.info("Request to create equipment: {}", equipment);
        Equipment result = equipmentRepository.save(equipment);
        return ResponseEntity.created(new URI("/api/equipment/" + result.getId()))
                .body(result);
    }

    @PutMapping("/equipment")
    ResponseEntity<Equipment> updateEquipment(@Valid @RequestBody Equipment equipment) {
        log.info("Request to update equipment: {}", equipment);
        Equipment result = equipmentRepository.save(equipment);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable Long id) {
        log.info("Request to delete equipment: {}", id);
        equipmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}