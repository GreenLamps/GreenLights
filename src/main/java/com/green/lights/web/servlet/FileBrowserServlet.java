package com.green.lights.web.servlet;

import com.ckfinder.connector.ConnectorServlet;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

/**
 * Created by SterOtto on 2017/5/23.
 */
@WebServlet(urlPatterns = "/ckfinder/core/connector/java/connector.java", initParams = {
    @WebInitParam(name = "XMLConfig", value = "classpath:config/ckfinder.xml"),
    @WebInitParam(name = "debug", value = "false"),
    @WebInitParam(name = "configuration", value = "com.green.lights.config.CKFinderConfig")
})
public class FileBrowserServlet extends ConnectorServlet{

}
