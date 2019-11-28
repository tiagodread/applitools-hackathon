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

describe('Table Sort Test', () => {
    beforeEach(() => {

        cy.visit('https://demo.applitools.com/hackathon.html')
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonApp.html');
    });

    it('should order the Transaction table by Amounts ascending', function () {
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
    beforeEach(() => {

        cy.visit('https://demo.applitools.com/hackathon.html')
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonApp.html');

        cy.get('#showExpensesChart').click()
    });

    it('should render the chart on the page', function () {
        cy.get('#canvas')
    });

    it('should render data for the next year option', function () {
        cy.get('#addDataset')
    });

    it('should Validate that the bar chart and representing that data (number of bars and their heights). ', function () {
        // This scenario isn't possible to implement in traditional way and/or it'll cost long time to do it.
    });
});

describe('Dynamic Content Test', () => {
    beforeEach(() => {

        cy.visit('https://demo.applitools.com/hackathon.html?showAd=true');
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonApp.html');
    });

    it('should render ads on the page', function () {
        cy.get('#flashSale')
            .get('#flashSale2')
    });

    it('should identify visual change on ads', function () {
        // This scenario isn't possible to implement in traditional way, maybe using applitools or percy
    });
});



