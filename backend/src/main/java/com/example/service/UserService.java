package com.example.service;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.example.model.User;
import com.example.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public User getOrCreateUserFromJwt(Jwt jwt) {
        String keycloakId = jwt.getClaimAsString("sub");
        String username = jwt.getClaimAsString("preferred_username");
        String email = jwt.getClaimAsString("email");

        return repository.findByKeycloakId(keycloakId)
                .orElseGet(() -> repository.save(new User(username, email, keycloakId)));
    }
}
