// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2: UPDATE TESTS FOR REGISTRATION FORM 1
*/

describe('This is the first test suite, Dmitri Kopljakov', () => {
    it('User can submit data only when valid mandatory values are added', () => {
    cy.get('#lastName').type('Kopljakov')
    cy.get('#firstName').type('Nikolai')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('MyPass123')
        cy.get('[name="confirm"]').type('MyPass123')
        cy.get('#username').type('Something')

        //Today's date is 02.05.2024 Nikolai K.

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()


        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')


        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        
        cy.get('[name="confirm"]').type('{enter}')

        cy.window().scrollTo('bottom')

        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
    
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')

        
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        
        cy.get('.submit_button').should('be.disabled')

        
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#lastName').type('Kopljakov')
        cy.get('#firstName').type('Nikolai')
        cy.get('[data-testid="phoneNumberTestId"]').type(' ')
        cy.get('input[name="password"]').type('MyPass123')
        cy.get('[name="confirm"]').type('MyPass123')
        cy.get('#username').type('Nicko')

    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('#lastName').type('Kopljakov')
        cy.get('#firstName').type('Nikolai')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(' ')
        cy.get('[name="confirm"]').type(' ')
        cy.get('#username').type('Nicko')

    })

    it('User cannot add letters to phone number', () => {
        cy.get('#lastName').type('Kopljakov')
        cy.get('#firstName').type('Nikolai')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('[data-testid="phoneNumberTestId"]').type('hhhjjjkkk')
        cy.get('input[name="password"]').type('MyPass123')
        cy.get('[name="confirm"]').type('MyPass123')
        cy.get('#username').type('Nicko')

    })
})