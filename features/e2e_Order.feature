Feature: End-to-End Order Placement

 
  @e2e
  Scenario Outline: User places an order with different credentials
 
    Given I am on the login page
    When I login with username "<username>" and password "<password>"
    Then I should be redirected to the home page
    When I search and select the product "Simple Computer"
    And I configure the product with desired options and add the product to the cart
    And I go to the cart
    Then I should see "Simple Computer" in the cart
    When I proceed to checkout
    And I enter shipping address and I place the order
    Then I should see order confirmation
    And I should see an order ID
 
    Examples:
      | username                        | password           |
      | supriyamorapelli@gmail.com      | supriyamorapelli   |
      | morapelli_supriya@gmail.com     | morapelli_supriya  |