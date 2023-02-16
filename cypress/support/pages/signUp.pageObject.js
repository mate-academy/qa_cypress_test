import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
    url = '/#/register';
  
    get emailField() {
      return cy.getByDataCy('email-sign-up');
    }
  
    get passwordField() {
      return cy.getByDataCy('password-sign-up');
    }

    get usernameField() {
        return cy.getByDataCy('username-sign-up');
    }
    
    get signUpBtn() {
      return cy.getByDataCy('sign-up-btn');
    }

    get modalWind() {
        return cy.get('.swal-modal');
      }
  }
  
  export default SignUpPageObject;