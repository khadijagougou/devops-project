package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.exceptions.StorageException;
import com.example.E_commerce.Platform.exceptions.StorageFileNotFoundException;
import com.example.E_commerce.Platform.services.facade.StorageService;
import com.example.E_commerce.Platform.utils.StorageProperties;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class StorageServiceImpl implements StorageService {
    private final Path rootLocation;

    @Autowired
    public StorageServiceImpl(StorageProperties properties) {

        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty.");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public String store(MultipartFile file) {
        try {
            // 🔥 sécurité: recrée dossier si absent
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path destinationFile = this.rootLocation.resolve(filename)
                    .normalize().toAbsolutePath();

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }

            return filename;

        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }
    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @PostConstruct
    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

}
