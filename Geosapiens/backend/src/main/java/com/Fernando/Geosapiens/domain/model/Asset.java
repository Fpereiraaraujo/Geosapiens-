package com.Fernando.Geosapiens.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    private UUID id;
    private String name;
    private String serialNumber;
    private LocalDate acquisitionDate;
    private String category;
    private String status;

}