package com.example.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Cart;
import com.example.model.User;
import com.example.service.CartService;
import com.example.service.UserService;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping(produces = "application/json")
    public Cart geCart(@AuthenticationPrincipal Jwt jwt) {
        User user = userService.getOrCreateUserFromJwt(jwt);
        return cartService.getCartByUser(user);
    }

    @PostMapping(value = "/add/{productId}", produces = "application/json")
    public Cart addProductToCart(@AuthenticationPrincipal Jwt jwt, @PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity) {
        User user = userService.getOrCreateUserFromJwt(jwt);
        return cartService.addProductToCart(user, productId, quantity);
    }

    @DeleteMapping(value = "/remove/{productId}")
    public void decreaseProductQuantityInCart(@AuthenticationPrincipal Jwt jwt, @PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity) {
        User user = userService.getOrCreateUserFromJwt(jwt);
        cartService.decreaseProductQuantityInCart(user, productId, quantity);
    }
}
