package com.Fernando.Geosapiens.framework.out.repositories;

import com.Fernando.Geosapiens.application.port.out.AssetPortOut;
import com.Fernando.Geosapiens.domain.model.Asset;
import com.Fernando.Geosapiens.framework.out.entities.AssetEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AssetRepositoryImp implements AssetPortOut {

    private final AssetRepository jpaRepository;

    @Override
    public List<Asset> findAll() {
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }



    @Override
    public Asset save(Asset asset) {
        AssetEntity entity = toEntity(asset);
        AssetEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Asset> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public Optional<Asset> findBySerialNumber(String serialNumber) {
        return jpaRepository.findBySerialNumber(serialNumber)
                .map(this::toDomain);
    }


    private Asset toDomain(AssetEntity entity) {
        return Asset.builder()
                .id(entity.getId())
                .name(entity.getName())
                .serialNumber(entity.getSerialNumber())
                .acquisitionDate(entity.getAcquisitionDate())
                .category(entity.getCategory())
                .status(entity.getStatus())
                .build();
    }

    private AssetEntity toEntity(Asset asset) {
        AssetEntity entity = new AssetEntity();
        entity.setId(asset.getId());
        entity.setName(asset.getName());
        entity.setSerialNumber(asset.getSerialNumber());
        entity.setAcquisitionDate(asset.getAcquisitionDate());
        entity.setCategory(asset.getCategory());
        entity.setStatus(asset.getStatus());
        return entity;
    }
}