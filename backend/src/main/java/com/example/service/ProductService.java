package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.model.Product;

@Service
public class ProductService {
    private final List<Product> products = new ArrayList<>(List.of(
        new Product(1L, "Laptop", "15-inch laptop with 16GB RAM and 512GB SSD", 899.99, 10),
        new Product(2L, "Smartphone", "6.5-inch display, 128GB storage, 5G enabled", 599.99, 25),
        new Product(3L, "Wireless Headphones", "Noise-cancelling over-ear headphones", 199.99, 50),
        new Product(4L, "Gaming Monitor", "27-inch 144Hz Full HD monitor", 299.99, 15),
        new Product(5L, "Mechanical Keyboard", "RGB backlit mechanical keyboard with blue switches", 129.99, 30)
    ));

    public List<Product> getAllProducts() {
        return products;
    }

    public Product getProductById(Long id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Product addProduct(Product product) {
        Long newId = products.isEmpty() ? 1L : products.get(products.size() - 1).getId() + 1;
        product.setId(newId);
        products.add(product);
        return product;
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existing = products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();

        if (existing.isPresent()) {
            Product product = existing.get();
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());
            return product;
        }
        return null;
    }

    public void deleteProduct(Long id) {
        products.removeIf(p -> p.getId().equals(id));
    }

}
