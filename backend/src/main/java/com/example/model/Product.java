package com.example.model;

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

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getDescription() { return description; }

    public double getPrice() { return price; }

    public int getQuantity() { return quantity; }
}

