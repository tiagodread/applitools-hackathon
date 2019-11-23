describe('Login Page UI Elements Test', () => {
    beforeEach(() => {

        cy.visit('https://demo.applitools.com/hackathon.html')
    });

    it('should render the form title on the page', function () {
        cy.get('.auth-header')
            .contains('Login Form')
    });

    it('should render username field with placeholder on the page', function () {
        cy.get('#username')
            .should('have.attr', 'placeholder', 'Enter your username')
    });

    it('should render password field with placeholder on the page', function () {
        cy.get('#password')
            .should('have.attr', 'placeholder', 'Enter your password')
    });

    it('should render a login button on the page', function () {
        cy.get('#log-in')
            .contains('Log In')
    });

    it('should render a checkbox (remember me) option on the page', function () {
        cy.get('.form-check-label')
            .should('to.have', '.form-check-input')
            .contains('Remember Me')
    });

    it('should render social buttons on the page', function () {
        cy.get('.buttons-w>div')
            .eq(1)
            .find('a')
            .should('have.length', 3)
    });
});

describe('Data-Driven Test', () => {
    beforeEach(() => {

        cy.visit('https://demo.applitools.com/hackathon.html')
    });

    it('should render an error message logging without username and password', function () {
        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Both Username and Password must be present')
        cy.location('href')
            .should('include', 'hackathon.html')
    });

    it('should render an error message logging without password', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Password must be present')
        cy.location('href')
            .should('include', 'hackathon.html')
    });

    it('should render an error message logging without username', function () {
        cy.get('#password')
            .type('admin');

        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Username must be present')
        cy.location('href')
            .should('include', 'hackathon.html')
    });

    it('should login successfully using username and password', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonApp.html')
    });
});
