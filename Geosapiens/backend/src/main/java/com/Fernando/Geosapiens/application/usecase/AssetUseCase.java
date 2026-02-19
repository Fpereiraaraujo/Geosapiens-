package com.Fernando.Geosapiens.application.usecase;

import com.Fernando.Geosapiens.application.port.in.AssetPortIn;
import com.Fernando.Geosapiens.application.port.out.AssetPortOut;
import com.Fernando.Geosapiens.domain.model.Asset;
import com.Fernando.Geosapiens.domain.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssetUseCase implements AssetPortIn {

    private final AssetPortOut assetPortOut;

    @Override
    public List<Asset> findAll() {
        return assetPortOut.findAll();
    }

    @Override
    public Asset findById(UUID id) {
        return assetPortOut.findById(id)
                .orElseThrow(() -> new BusinessException("ativo não encontrado com o id: " + id));
    }

    @Override
    public Asset save(Asset asset) {
        validateAsset(asset);
        checkDuplicateSerialNumber(asset);
        return assetPortOut.save(asset);
    }

    @Override
    public Asset update(UUID id, Asset asset) {
        Asset existingAsset = findById(id);
        validateAsset(asset);
        asset.setId(existingAsset.getId());
        checkDuplicateSerialNumber(asset);
        return assetPortOut.save(asset);
    }

    @Override
    public void deleteById(UUID id) {
        if (assetPortOut.findById(id).isEmpty()) {
            throw new BusinessException("impossível deletar: ativo inexistente.");
        }
        assetPortOut.deleteById(id);
    }

    private void validateAsset(Asset asset) {
        if (!StringUtils.hasText(asset.getName())) {
            throw new BusinessException("o nome do ativo é obrigatório.");
        }
        if (!StringUtils.hasText(asset.getSerialNumber())) {
            throw new BusinessException("o número de série é obrigatório.");
        }
        if (asset.getAcquisitionDate() == null) {
            throw new BusinessException("a data de aquisição é obrigatória.");
        }
        if (asset.getAcquisitionDate().isAfter(LocalDate.now())) {
            throw new BusinessException("a data de aquisição não pode estar no futuro.");
        }
    }

    private void checkDuplicateSerialNumber(Asset asset) {
        Optional<Asset> existingAsset = assetPortOut.findBySerialNumber(asset.getSerialNumber());
        if (existingAsset.isPresent()) {
            if (asset.getId() == null || !existingAsset.get().getId().equals(asset.getId())) {
                throw new BusinessException("já existe um ativo cadastrado com o número de série: " + asset.getSerialNumber());
            }
        }
    }
}