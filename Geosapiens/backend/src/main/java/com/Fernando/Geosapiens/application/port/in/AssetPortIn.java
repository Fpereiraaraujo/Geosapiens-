package com.Fernando.Geosapiens.application.port.in;

import com.Fernando.Geosapiens.domain.model.Asset;
import java.util.List;
import java.util.UUID;

public interface AssetPortIn {
    List<Asset> findAll();
    Asset save(Asset asset);
    Asset findById(UUID id);
    Asset update(UUID id, Asset asset);
    void deleteById(UUID id);
}