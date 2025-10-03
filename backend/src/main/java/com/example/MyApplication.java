package com.example;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class MyApplication {

    @RequestMapping("/products")
    List<Product> home() {
        return List.of(
            new Product(1L, "Laptop", "15-inch laptop with 16GB RAM and 512GB SSD", 899.99, 10),
            new Product(2L, "Smartphone", "6.5-inch display, 128GB storage, 5G enabled", 599.99, 25),
            new Product(3L, "Wireless Headphones", "Noise-cancelling over-ear headphones", 199.99, 50),
            new Product(4L, "Gaming Monitor", "27-inch 144Hz Full HD monitor", 299.99, 15),
            new Product(5L, "Mechanical Keyboard", "RGB backlit mechanical keyboard with blue switches", 129.99, 30)
        );
    }

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }

    public class Product {
        private Long id;
        private String name;
        private String description;
        private double price;
        private int quantity;

        public Product(Long id, String name, String description, double price, int quantity) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.quantity = quantity;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public double getPrice() {
            return price;
        }

        public int getQuantity() {
            return quantity;
        }
    }
}
