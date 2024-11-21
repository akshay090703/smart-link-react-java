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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthServiceImpl authService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String jwt = null;
        String email = null;

        try {
            // Extract JWT from cookies
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("JWT_TOKEN".equals(cookie.getName())) {
                        jwt = cookie.getValue();
                        break;
                    }
                }
            }

            // Validate the JWT and extract email
            if (jwt != null) {
                email = jwtUtil.extractEmail(jwt);

                if (email == null || !jwtUtil.isTokenValid(jwt, email)) {
                    throw new IllegalArgumentException("Invalid or expired token");
                }
            }

            // Authenticate the user if the email is valid and authentication context is empty
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Optional<User> user = authService.getUserByEmail(email);

                if (user.isPresent()) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(user.get(), null, user.get().getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    throw new IllegalArgumentException("User not found for the provided token");
                }
            }

            // Proceed with the filter chain
            filterChain.doFilter(request, response);

        } catch (IllegalArgumentException e) {
            // Handle invalid token cases
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
            logger.warn("Authentication failed: " + e.getMessage() + " - IP: " + request.getRemoteAddr());
        } catch (Exception e) {
            // Handle unexpected errors
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"An unexpected error occurred\"}");
            logger.error("Unexpected error during authentication", e);
        }
    }

}
