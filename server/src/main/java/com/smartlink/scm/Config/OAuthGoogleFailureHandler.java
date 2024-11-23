package com.smartlink.scm.Config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuthGoogleFailureHandler implements AuthenticationFailureHandler {
    @Value("${app.client}")
    private String appClient;

    Logger logger = LoggerFactory.getLogger(OAuthGoogleFailureHandler.class);

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        logger.info("onAuthenticationFailure");

        response.sendRedirect(appClient + "/auth");
    }
}
