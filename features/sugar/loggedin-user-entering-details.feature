@sugar
Feature: Enter company details successfully
  As an loggedIn user
  I should able to enter company details

  
Scenario Outline: LoggedIn user places an order successfully
  Given I am on login page
  When I enter login details
  Then I should be on company details page
  When I select "<comapanyName>" company name
  And I enter phone number as "<phoneNumber>"
  And I proceed with submit button
  Then I should be on product details page
  When I select product
  Then I should be on welcome page
  When I click on start integrations
  Then I should be on analytics page
  When I click on appsflyer
  Then I should be on appsflyer page
  When I click on Next button on appsflyer page
  Then I should be on banking page
  When I click on Next button on banking page
  Then I should be on accounting system page
  When I click on Next button on accounting system page
  Then I should be on product details page
  When I click on continue button
  

Examples:
| comapanyName                    | phoneNumber |
| KONGSHOLM INVEST LIMITED        | 01145678904 |