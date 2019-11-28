beforeEach(() => {
    cy.eyesOpen({
        appName: 'Hackathon',
        batchName: 'Hackathon',
        browser: {width: 1920, height: 1080},
        eyesTimeout: 180000,
    });
    cy.visit('https://demo.applitools.com/hackathon.html');
});

afterEach(() => {
    cy.eyesClose();
});

function login() {
    cy.get('#username')
        .type('Tiago');

    cy.get('#password')
        .type('Tiago');

    cy.get('#log-in')
        .click();
    cy.location('href')
        .should('include', 'hackathonApp.html');
}

describe('Login Page UI Elements Test', () => {

    it('should render the page', function () {
        cy.eyesCheckWindow('Login Page');
    });
});

describe('Data-Driven Test', () => {

    it('should render an error message logging without username and password', function () {
        cy.get('#log-in')
            .click();
        cy.eyesCheckWindow('Message error: Login without username and password')
    });

    it('should render an error message logging without password', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.eyesCheckWindow('Message error: Login without password')
    });

    it('should render an error message logging without username', function () {
        cy.get('#password')
            .type('admin');
        cy.get('#log-in')
            .click();
        cy.eyesCheckWindow('Message error: Login without username')
    });

    it('should login successfully using username and password', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.eyesCheckWindow('Dashboard')
    });
});

describe('Table Sort Test', () => {
    it('should order the Transaction table by Amounts ascending', function () {
        cy.get('#username')
            .type('Tiago');

        cy.get('#password')
            .type('Tiago');

        cy.get('#log-in')
            .click();
        cy.location('href')
            .should('include', 'hackathonApp.html');
        cy.get('#amount').click();
        cy.eyesCheckWindow('Transaction Table order by amount asc')
    });
});

describe('Canvas Chart Test', () => {

    it('should render the chart on the page', function () {
        login();
        cy.get('#showExpensesChart').click();
        cy.eyesCheckWindow('Expenses and Forecasts Comparison Page ')
    });

    it('should render data for the next year option', function () {
        login();
        cy.get('#showExpensesChart').click();
        cy.get('#addDataset').click();
        cy.eyesCheckWindow('Expenses and Forecasts Comparison (next year) Page ')
    });
});