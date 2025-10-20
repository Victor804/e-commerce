package com.example.stepdefinitions;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Product;
import com.example.service.ProductService;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class ProductSteps {

    @Autowired
    private ProductService productService;

    private List<Product> products;

    @Before
    public void cleanDatabase(){
        productService.deleteAllProduct();;
    }

    @Given("the product service has products")
    public void the_product_service_has_products() {
        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setPrice(999.99);
        laptop.setDescription("High-performance laptop");

        Product mouse = new Product();
        mouse.setName("Mouse");
        mouse.setPrice(25.99);
        mouse.setDescription("Wireless mouse");

        Product keyboard = new Product();
        keyboard.setName("Keyboard");
        keyboard.setPrice(79.99);
        keyboard.setDescription("Mechanical keyboard");

        productService.addProduct(laptop);
        productService.addProduct(mouse);
        productService.addProduct(keyboard);

        products = productService.getAllProducts();
        assertNotNull(products, "Products list should not be null");
        assertFalse(products.isEmpty(), "Products list should not be empty");
    }

    @When("I request all products")
    public void i_request_all_products() {
        products = productService.getAllProducts();
        assertNotNull(products, "Products list should not be null");
    }

    @Then("I should receive a list of products")
    public void i_should_receive_a_list_of_products() {
        assertNotNull(products, "Products list should not be null");
    }

    @Then("the list should not be empty")
    public void the_list_should_not_be_empty() {
        assertFalse(products.isEmpty(), "Products list should not be empty");
        assertTrue(products.size() > 0, "Products list should contain at least one product");
    }
}