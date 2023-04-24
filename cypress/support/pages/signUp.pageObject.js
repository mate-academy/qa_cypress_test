import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get pageTitle() {
    return cy.getByDataQA('title');
  }

  get signInLink() {
    return cy.getByDataQA('sign-in-link');
  }

  get usernameField() {
    return cy.getByDataQA('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQA('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQA('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQA('sign-up-btn');
  }
}

export default SignUpPageObject;