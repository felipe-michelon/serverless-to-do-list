describe('When visiting the home page', () => {
  before(() => {
    cy.server()
    cy.route('GET', '*/todos', 'fixture:todos/items.json')
    cy.route('POST', '*/todos', '').as('createItem')

    cy.visit('/')
  })

  context('when i fill the field to create a todo item', () => {
    before(() => {
      cy.get('input:first')
      .should('have.attr', 'placeholder', 'Adicione um novo item...')
      .type('novo item')
      cy.get('button:first').click()
    })

    it('makes a request to create the item', () => {
      cy.wait('@createItem')
    })

    it('clean the field after submitting', () => {
      cy.get('input:first').should('be.empty')
    })
  })

  context("when i don't fill the field to create a todo item", () => {
    it('should make the button disabled', () => {
      cy.get('button:first').should('be.disabled')
    })
  })
})
