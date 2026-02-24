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
        return assetPortOut.save(asset);
    }

    @Override
    public Asset update(UUID id, Asset asset) {

        Asset existingAsset = findById(id);

        validateAsset(asset);


        asset.setId(existingAsset.getId());
        return assetPortOut.save(asset);
    }

    @Override
    public void deleteById(UUID id) {
        if (assetPortOut.findById(id).isEmpty()) {
            throw new BusinessException("impossível deletar: aativo inexistente.");
        }
        assetPortOut.deleteById(id);
    }


    private void validateAsset(Asset asset) {
        if (!StringUtils.hasText(asset.getName())) {
            throw new BusinessException("o nome do ativo e obrigatório.");
        }

        if (!StringUtils.hasText(asset.getSerialNumber())) {
            throw new BusinessException("o numero de série e obrigatório.");
        }

        if (asset.getAcquisitionDate() == null) {
            throw new BusinessException("a data de aquisição e obrigatória.");
        }

        if (asset.getAcquisitionDate().isAfter(LocalDate.now())) {
            throw new BusinessException("a data de aquisição nao pode ser no futuro.");
        }
    }
}