package com.green.lights.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.green.lights.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

/**
 * Created by SterOtto on 2017/5/22.
 */
@RestController
@RequestMapping("/api")
public class FilesResource {

    private static final Logger logger = LoggerFactory.getLogger(FilesResource.class);

    @Value("${application.storage.path.base}")
    private String storagePathBase;

    @Value("${application.storage.path.images}")
    private String imagesPathFormat;

    @Value("${application.storage.uri.base}")
    private String accessUri;

    @Value("${application.storage.uri.images}")
    private String imagesUri;

    /**
     * upload image and return the image url
     * @param image
     * @return
     */
    @PostMapping(value = "/upload/image", produces = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @Timed
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        String fileUrl;
        if (!image.isEmpty()){
            Path path = Paths.get(String.format(imagesPathFormat, SecurityUtils.getCurrentUserLogin()),image.getOriginalFilename());
            try {
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes(), StandardOpenOption.CREATE);
                fileUrl = String.format(imagesUri, SecurityUtils.getCurrentUserLogin())+path.getFileName().toString();
            } catch (IOException e) {
                logger.error("upload image error", e);
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity(fileUrl,HttpStatus.OK);
        }
        return new ResponseEntity("image is empty!", HttpStatus.BAD_REQUEST);
    }
}
