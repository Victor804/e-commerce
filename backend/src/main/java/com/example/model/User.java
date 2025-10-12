package com.example.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String keycloakId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Cart cart;

    public User() {}
    
    public User(String name, String email, String keycloakId) {
        this.name = name;
        this.email = email;
        this.keycloakId = keycloakId;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getKeycloakId() { return keycloakId; }
    public Cart getCart() { return cart; }

    public void setKeycloakId(String keycloakId) {this.keycloakId = keycloakId; }
    public void setCart(Cart cart) { this.cart = cart; }

}

