package com.smartlink.scm.Config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {
    @Value("${cloudinary.cloud.name}")
    private String cloudName;

    @Value("${cloudinary.api.key}")
    private String apiKey;

    @Value("${cloudinary.api.secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        Map<String,String> configs = new HashMap<String,String>();
        configs.put("cloud_name", cloudName);
        configs.put("api_key", apiKey);
        configs.put("api_secret", apiSecret);

        return new Cloudinary();
    }
}
