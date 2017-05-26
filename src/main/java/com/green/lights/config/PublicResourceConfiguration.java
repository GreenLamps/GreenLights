package com.green.lights.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by SterOtto on 2017/5/22.
 */
@Configuration
public class PublicResourceConfiguration extends WebMvcConfigurerAdapter {

    @Value("${application.storage.path.base}")
    private String resourceLocation;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/public/files/**")
            .addResourceLocations("file:" + resourceLocation);
/*        registry.addResourceHandler("/ckfinder*//**")
            .addResourceLocations("classpath:/static/ckfinder/");*/
        super.addResourceHandlers(registry);
    }
}
