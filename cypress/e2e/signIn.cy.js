/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const pageTitle = require('../fixtures/pageTitles.json');
const linkTitle = require('../fixtures/linkTitles.json');
const validation = require('../fixtures/validationMessages.json');
const btnNames = require('../fixtures/buttonNames.json');

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe(`'Sign In' page`, () => {
  beforeEach(() => {
    cy.wrap(Cypress.currentTest.title).as('testTitle');

    cy.task('db:clear');

    cy.task('generateUserData').as('userData').then((user) => {
      const userData = user;

      cy.register(userData);
    });

    cy.task('generateUserData').as('newUserData');

    signInPage.visit();
  });

  it(`should have the main components`, function () {
    signInPage.assertPageTitle(pageTitle.signInTitle);
    signInPage.assertLinkNeedAccountExists(linkTitle.noAccount);
    signInPage.assertSignInFormExists(btnNames.signIn);
  });

  it(`should allow user to get the 'Sign up' page by 'Need an account?' link`, function () {
    signInPage.clickOnNeedAccountLink();
    signInPage.assertPageUrl(signUpPage.url);
    signInPage.assertPageTitle(pageTitle.signUpTitle);
  });

  it(`should alow to log in with existing credentials`, function () {
    const {
      username,
      email: { normalEmail },
      password: { normalPassword }
    } = this.userData;

    signInPage.typeEmail(normalEmail);
    signInPage.typePassword(normalPassword);
    signInPage.assertPasswordIsmasked();
    signInPage.clickOnSignInBtn();

    homePage.assertHeaderContainUsername(username);
  });

  it(`should not allow to log in with non-existed email`, function () {
    const {
      password: { normalPassword }
    } = this.userData;

    const {
      email: { normalEmail: newEmail }
    } = this.newUserData;

    signInPage.typeEmail(newEmail);
    signInPage.typePassword(normalPassword);
    signInPage.clickOnSignInBtn();

    signInPage.assertErrorMessage(validation.error.invalidCreds);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with non-existed password`, function () {
    const {
      email: { normalEmail }
    } = this.userData;

    const {
      password: { normalPassword: newPassword }
    } = this.newUserData;

    signInPage.typeEmail(normalEmail);
    signInPage.typePassword(newPassword);
    signInPage.clickOnSignInBtn();

    signInPage.assertErrorMessage(validation.error.invalidCreds);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with email without [name] part`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.invalidEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with email without '@' symbol`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.invalidEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with email without [domain] part`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.invalidEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with email without dot (.)`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.invalidEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with email without [top-domain] part`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.invalidEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with the empty 'Email' field`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.emptyEmail);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });

  it(`should not allow to log in with the empty 'Password' field`, function () {
    signInPage.fillFormAndSubmit(this.userData);
    signInPage.assertErrorMessage(validation.error.emptyPassword);
    signInPage.clickOnOkeyBtn();

    signInPage.assertPageUrl(signInPage.url);
    signInPage.assertHeaderNotContainUsername();
  });
});
