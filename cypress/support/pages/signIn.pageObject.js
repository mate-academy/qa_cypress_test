import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  checkWrong(text) {
    this.modalTitle.should('contain.text', text);
  }
}

export default SignInPageObject;
