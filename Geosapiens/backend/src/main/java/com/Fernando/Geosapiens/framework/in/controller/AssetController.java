package com.Fernando.Geosapiens.framework.in.controller;

import com.Fernando.Geosapiens.application.port.in.AssetPortIn;
import com.Fernando.Geosapiens.domain.model.Asset;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Assets", description = "gerenciamento de ativos da empresa")
public class AssetController {

    private final AssetPortIn assetPortIn;

    @Operation(summary = "listar todos os ativos", description = "retorna uma lista de computadores, monitores e periféricos")
    @GetMapping
    public ResponseEntity<List<Asset>> getAll() {
        return ResponseEntity.ok(assetPortIn.findAll());
    }

    @Operation(summary = "buscar ativo por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "ativo encontrado"),
            @ApiResponse(responseCode = "404", description = "ativo nao encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Asset> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(assetPortIn.findById(id));
    }

    @Operation(summary = "cadastrar novo ativo", description = "valida nome, numero de serie e data de aquisição")
    @PostMapping
    public ResponseEntity<Asset> create(@RequestBody Asset asset) {
        Asset savedAsset = assetPortIn.save(asset);
        return new ResponseEntity<>(savedAsset, HttpStatus.CREATED);
    }

    @Operation(summary = "atualizar um ativo existente")
    @PutMapping("/{id}")
    public ResponseEntity<Asset> update(@PathVariable UUID id, @RequestBody Asset asset) {
        return ResponseEntity.ok(assetPortIn.update(id, asset));
    }

    @Operation(summary = "remover um ativo")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        assetPortIn.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
