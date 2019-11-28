beforeEach(() => {
    cy.visit('https://demo.applitools.com/hackathonV2.html')
});

function login() {
    cy.get('#username')
        .type('Tiago');

    cy.get('#password')
        .type('Tiago');

    cy.get('#log-in')
        .click();
    cy.location('href')
        .should('include', 'hackathonAppV2.html');
}

describe('Login Page UI Elements Test', () => {

    it('should render the form title on the page', function () {
        cy.get('.auth-header')
            .contains('Logout Form')
    });

    it('should render username field with placeholder on the page', function () {
        cy.get('#username')
            .should('have.attr', 'placeholder', 'John Smith')
    });

    it('should render password field with placeholder on the page', function () {
        cy.get('#password')
            .should('have.attr', 'placeholder', 'ABC$*1@')
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
            .find('span')
            .should('have.length', 2)
    });
});

describe('Data-Driven Test', () => {

    it('should render an error message logging without username and password', function () {
        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Please enter both username and password');
        cy.location('href')
            .should('include', 'hackathonV2.html')
    });

    it('should render an error message logging without password', function () {
        // This test still failing in App V2
        cy.get('#username')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Password must be present');
        cy.location('href')
            .should('include', 'hackathonV2.html')
    });

    it('should render an error message logging without username', function () {
        cy.get('#password')
            .type('admin');

        cy.get('#log-in')
            .click();
        cy.get('.alert-warning')
            .contains('Username must be present');
        cy.location('href')
            .should('include', 'hackathonV2.html')
    });

    it('should login successfully using username and password', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonAppV2.html')
    });
});

describe('Table Sort Test', () => {

    it('should order the Transaction table by Amounts ascending', function () {
        // This test still failing in App V2
        login();
        cy.get('#amount').click();

        const amountSorted = ['- 320.00 USD', '- 244.00 USD', '+ 17.99 USD', '+ 340.00 USD', '+ 952.23 USD', '+ 1,250.00 USD'];
        cy.get('#transactionsTable>tbody>tr>.text-right>span')
            .should(($elements) => {
                const elementText = $elements.toArray().map(el => el.innerText);
                expect(elementText).to.deep.eq(amountSorted)
            });
    });
});

describe('Canvas Chart Test', () => {

    it('should render the chart on the page', function () {
        login();
        cy.get('#showExpensesChart').click();
        cy.get('#canvas')
    });

    it('should render data for the next year option', function () {
        login();
        cy.get('#showExpensesChart').click();
        cy.get('#addDataset')
    });

    it('should Validate that the bar chart and representing that data (number of bars and their heights). ', function () {
        // This scenario isn't possible to implement in traditional way and/or it'll cost long time to do it.
    });
});

describe('Dynamic Content Test', () => {

    it('should render ads on the page', function () {
        cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true');
        login();
        cy.get('#flashSale')
            .get('#flashSale2')
    });

    it('should identify visual change on ads', function () {
        // This scenario isn't possible to implement in traditional way, maybe using applitools or percy
    });
});