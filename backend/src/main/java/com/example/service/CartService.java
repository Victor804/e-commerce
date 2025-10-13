package com.example.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Product;
import com.example.model.User;
import com.example.repository.CartRepository;
import com.example.repository.ProductRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository; 

    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user).orElse(null);
    }

    @Transactional
    public Cart addProductToCart(User user, Long productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart(user);
            return cartRepository.save(newCart); 
        });

        Optional<CartItem> existingItem = cart.getItems().stream().filter(item -> item.getProduct().getId().equals(productId)).findFirst();

        if(existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem(product, cart, quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);   
    }

    @Transactional
    public Cart decreaseProductQuantityInCart(User user, Long productId, int quantity) {
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Cart not found"));

        Optional<CartItem> existingItem = cart.getItems().stream().filter(item -> item.getProduct().getId().equals(productId)).findFirst();
        
        if(existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() - quantity);
            if(item.getQuantity() <= 0) {
                cart.getItems().remove(item);
            }
        }
        return cartRepository.save(cart);
    }
}
