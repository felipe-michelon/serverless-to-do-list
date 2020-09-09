describe('When visiting the home page', () => {
  before(() => {
    cy.server()
    cy.route('GET', '*/todos', 'fixture:todos/items.json')
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the properties of each item', () => {
    cy.get('div.TodoItem:first').within(() => {
      cy.contains('span', 'item 1')
      cy.get('[type="checkbox"]').should('not.have.attr', 'checked')
    })

    cy.get('div.TodoItem:last').within(() => {
      cy.contains('strike', 'item 2')
      cy.get('[type="checkbox"]').should('have.attr', 'checked')
    })
  })
})
