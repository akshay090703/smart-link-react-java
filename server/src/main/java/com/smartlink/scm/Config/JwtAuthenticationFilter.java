package com.smartlink.scm.Config;

import com.smartlink.scm.model.User;
import com.smartlink.scm.service.AuthService;
import com.smartlink.scm.service.JwtUtil;
import com.smartlink.scm.service.impl.AuthServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthServiceImpl authService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();

        if (requestPath.startsWith("/auth/") || requestPath.startsWith("/oauth2/") || requestPath.equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("JWT Filter triggered for: " + request.getRequestURI());

        try {
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

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                String email = jwtUtil.extractEmail(jwt);
                if (email != null && jwtUtil.isTokenValid(jwt, email)) {
                    User user = authService.getUserByEmail(email)
                            .orElseThrow(() -> new IllegalArgumentException("User not found for the provided token"));

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    logger.info("Filter authentication successful for user: " + email);
                }
            }

            filterChain.doFilter(request, response);

        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Unauthorized access\"}");
            logger.warn("Filter authentication failed: " + e.getMessage() + " - IP: " + request.getRemoteAddr());
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"An unexpected error occurred\"}");
            logger.error("Unexpected error during filter authentication", e);
        }
    }
}
