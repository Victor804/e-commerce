Feature: Product API
  As a user
  I want to view and retrieve products
  So that I can see product details

  Scenario: Get all products
    Given the product service has products
    When I request all products
    Then I should receive a list of products
    And the list should not be empty