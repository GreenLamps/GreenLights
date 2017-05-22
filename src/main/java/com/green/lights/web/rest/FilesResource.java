package com.green.lights.web.rest;

import com.green.lights.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
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
     * ckeditor upload image and return the image url
     * @param image
     * @param request
     * @param response
     * @return
     */
    @PostMapping(value = "/ckeditor/upload/image")
    public ResponseEntity<String> ckUploadImage(@RequestParam("upload") MultipartFile image, HttpServletRequest request, HttpServletResponse response) {
        if (!image.isEmpty()){
            Path path = Paths.get(String.format(imagesPathFormat, SecurityUtils.getCurrentUserLogin()),image.getOriginalFilename());
            try {
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes(), StandardOpenOption.CREATE);
                // return url to ckeditor
                String fileUrl = String.format(imagesUri, SecurityUtils.getCurrentUserLogin())+path.getFileName().toString();
                String callback = request.getParameter("CKEditorFuncNum");
                String script = "<script type=\"text/javascript\">window.parent.CKEDITOR.tools.callFunction(" + callback + ", '" + fileUrl + "');</script>";
                response.setContentType("text/html; charset=UTF-8");
                response.setHeader("Cache-Control", "no-cache");
                //Refused to display 'http://localhost:8080/api/ckeditor/upload/image?CKEditor=practice_content&CKEditorFuncNum=1&langCode=zh-cn' in a frame because it set 'X-Frame-Options' to 'DENY'.
                response.setHeader("X-Frame-Options", "SAMEORIGIN");
                PrintWriter out = response.getWriter();
                out.println(script);
                out.flush();
                out.close();
            } catch (IOException e) {
                logger.error("upload image error", e);
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity("image is empty!", HttpStatus.BAD_REQUEST);
    }
}
