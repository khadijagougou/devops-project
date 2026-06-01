package com.example.E_commerce.Platform.services.facade;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;

public interface StorageService {
    void init();

    String store(MultipartFile file);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
