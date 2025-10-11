package com.example.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Cart;
import com.example.service.CartService;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping(value = "/{userId}", produces = "application/json")
    public Cart geCartById(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping(value = "/{userId}/add/{productId}", produces = "application/json")
    public Cart addProductToCart(@PathVariable Long userId, @PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity) {
        return cartService.addProductToCart(userId, productId, quantity);
    }

    @DeleteMapping(value = "/{userId}/remove/{productId}")
    public void decreaseProductQuantityInCart(@PathVariable Long userId, @PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity) {
        cartService.decreaseProductQuantityInCart(userId, productId, quantity);
    }
}
