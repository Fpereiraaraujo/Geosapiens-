package com.Fernando.Geosapiens.framework.out.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "assets")
@Getter
@Setter
public class AssetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String serialNumber;

    @Column(nullable = false)
    private LocalDate acquisitionDate;

    private String category;
    private String status;
}