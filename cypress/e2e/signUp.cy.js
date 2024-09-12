/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should provide an ability to register by filling acceptable values',
    () => {
      signUpPage.typeuserName(user.username);
      signUpPage.typeuserEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertSuccessfulSignUp();
      signUpPage.clickOnModalOkBtn();
      homePage.assertHeaderContainUsername(user.username);
    });

  it('should not provide an ability to register with blank username field',
    () => {
      signUpPage.typeuserEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertEmptyUsername();
    });

  it('should not provide an ability to register with blank email field',
    () => {
      signUpPage.typeuserName(user.username);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertEmptyEmail();
    });

  it('should not provide an ability to register with blank password field',
    () => {
      signUpPage.typeuserEmail(user.email);
      signUpPage.typeuserName(user.username);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertEmptyPassword();
    });

  it('should not provide an ability to register without "@" in email field',
    () => {
      const wrongEmail = faker.random.word();

      signUpPage.typeuserEmail(wrongEmail);
      signUpPage.typeuserName(user.username);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertWrongEmail();
    });

  it('should not provide an ability to register without domain in email field',
    () => {
      const wrongEmail = faker.random.word();

      signUpPage.typeuserEmail(wrongEmail + '@');
      signUpPage.typeuserName(user.username);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertWrongEmail();
    });

  it('should not provide an ability to register with short password field',
    () => {
      signUpPage.typeuserEmail(user.email);
      signUpPage.typeuserName(user.username);
      signUpPage.typePassword('Serhii1');
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertWrongPassword();
    });

  it('should not provide an ability to register with ' +
   'space in password field',
  () => {
    signUpPage.typeuserEmail(user.email);
    signUpPage.typeuserName(user.username);
    signUpPage.typePassword('Serhi i1');
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertWrongPassword();
  });

  it('should not provide an ability to register without ' +
   'capital letter in password field',
  () => {
    signUpPage.typeuserEmail(user.email);
    signUpPage.typeuserName(user.username);
    signUpPage.typePassword('sserhii1');
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertWrongPassword();
  });

  it('should not provide an ability to register without ' +
   'lowercase letter in password field',
  () => {
    signUpPage.typeuserEmail(user.email);
    signUpPage.typeuserName(user.username);
    signUpPage.typePassword('SSERHII1');
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertWrongPassword();
  });

  it('should not provide an ability to register without ' +
   'number in password field',
  () => {
    signUpPage.typeuserEmail(user.email);
    signUpPage.typeuserName(user.username);
    signUpPage.typePassword('SSerhiiii');
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertWrongPassword();
  });

  it('should not provide an ability to register with existing email',
    () => {
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      });
      cy.register(user.email, user.username, user.password);
      const randomUsername = faker.name.firstName();

      signUpPage.typeuserName(randomUsername);
      signUpPage.typeuserEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      signUpPage.assertTakenEmail();
    });
});
