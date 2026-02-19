package com.Fernando.Geosapiens.framework.out.repositories;

import com.Fernando.Geosapiens.application.port.out.AssetPortOut;
import com.Fernando.Geosapiens.domain.model.Asset;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class AssetRepositoryImp implements AssetPortOut {
    @Override
    public List<Asset> findAll() {
        return List.of();
    }

    @Override
    public Asset save(Asset asset) {
        return null;
    }

    @Override
    public Optional<Asset> findById(UUID id) {
        return Optional.empty();
    }

    @Override
    public void deleteById(UUID id) {

    }
}
