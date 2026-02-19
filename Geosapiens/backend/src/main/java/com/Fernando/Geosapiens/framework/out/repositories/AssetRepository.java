package com.Fernando.Geosapiens.framework.out.repositories;

import com.Fernando.Geosapiens.framework.out.entities.AssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssetRepository extends JpaRepository<AssetEntity, UUID> {

    Optional<AssetEntity> findBySerialNumber(String serialNumber);
    
}