import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignInLink(link) {
    this.signInLink
      .should('contain', link);
  }
}

export default HomePageObject;
