@sugar @register
Feature: Register a user successfully
  As an annonumous user
  I should able to registera user
  
Scenario: Register user
  Given I am on registration page
  When I enter registration details
  Then I should be on activate account page
  When I enter verification code