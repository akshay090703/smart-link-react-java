package com.smartlink.scm.Config;

import com.smartlink.scm.helpers.AppConstants;
import com.smartlink.scm.model.Providers;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.UserRepo;
import com.smartlink.scm.service.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class OAuthGoogleSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private UserRepo repo;

    @Value("${app.client}")
    private String appClient;

    @Autowired
    private JwtUtil jwtUtil;

    Logger logger = LoggerFactory.getLogger(OAuthGoogleSuccessHandler.class);
    @Autowired
    private UserRepo userRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("Success");
        logger.info("onAuthenticationSuccess");

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = token.getPrincipal().getAttributes();

        String fullName = (String) attributes.get("name");
        String email = (String) attributes.get("email");
        String picture = (String) attributes.get("picture");
        Boolean emailVerified = (Boolean) attributes.get("email_verified");
        String accessToken = (String) token.getPrincipal().getAttributes().get("access_token");
        String providerId = (String) token.getName();

        System.out.println(accessToken);

        User user = new User();

        user.setName(fullName);
        user.setEmail(email);
        user.setProfilePic(picture);
        user.setPassword("password");
        user.setUserId(UUID.randomUUID().toString());
        user.setProvider(Providers.GOOGLE);
        user.setEnabled(true);
        user.setEmailVerified(emailVerified);
        user.setProviderId(providerId);
        user.setRoleList(List.of(AppConstants.ROLE_USER));
        user.setAbout("This user is created using Google.");

        User dbUser = userRepo.findByEmail(email).orElse(null);

        if(dbUser == null) {
            repo.save(user);
            logger.info("saved user: " + email);
        }

        String newToken = jwtUtil.generateToken(email);

        Cookie cookie = new Cookie("JWT_TOKEN", newToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);

        System.out.println("Cookie added: " + cookie.getName());

        request.getSession().invalidate();

        Cookie googleCookie = new Cookie("JSESSIONID", null);
        googleCookie.setPath("/");
        googleCookie.setHttpOnly(true);
        googleCookie.setMaxAge(0);
        response.addCookie(googleCookie);

        response.sendRedirect("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue="  + appClient + "/dashboard");
    }
}
