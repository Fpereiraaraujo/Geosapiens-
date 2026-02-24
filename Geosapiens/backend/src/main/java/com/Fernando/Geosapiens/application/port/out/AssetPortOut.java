package com.Fernando.Geosapiens.application.port.out;

import com.Fernando.Geosapiens.domain.model.Asset;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AssetPortOut {
    List<Asset> findAll();
    Asset save(Asset asset);
    Optional<Asset> findById(UUID id);
    void deleteById(UUID id);
}
