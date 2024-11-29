package com.smartlink.scm.helpers;

import com.smartlink.scm.service.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class TokenUtil {
    @Autowired
    private JwtUtil jwtUtil;

    public String getEmailFromJwt(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String jwt = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JWT_TOKEN".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if(jwt == null) {
            throw new IllegalArgumentException("No Token in the request!");
        }

        return jwtUtil.extractEmail(jwt);
    }
}
