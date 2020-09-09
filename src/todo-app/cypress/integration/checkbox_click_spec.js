describe('When having a todo item on the screen', () => {
  before(() => {
    cy.server()
    cy.route('GET', '*/todos', 'fixture:todos/items.json')
    cy.route('PUT', '*/todos/1', '').as('updateRequest')

    cy.visit('/')
  })

  context('when i click the checkbox of that item', () => {
    it('makes a request to update the item', () => {
      cy.get('div.TodoItem:first').within(() => {
        cy.get('[type="checkbox"]').click()
        cy.wait('@updateRequest')
      })
    })
  })
})
