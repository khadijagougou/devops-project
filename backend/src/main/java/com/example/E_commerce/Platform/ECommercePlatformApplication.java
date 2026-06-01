package com.example.E_commerce.Platform;

import com.example.E_commerce.Platform.utils.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)

public class ECommercePlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(ECommercePlatformApplication.class, args);
    }

}
