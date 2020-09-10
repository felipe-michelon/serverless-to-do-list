describe('When having a todo item on the screen', () => {
  before(() => {
    cy.server()
    cy.route('GET', '*/todos', 'fixture:todos/items.json')
    cy.route('DELETE', '*/todos/1', '').as('deleteItem')

    cy.visit('/')
  })

  context('when i click the trashbin of that item', () => {
    context('and confirm the dialog', () => {
      before(() => {
        cy.on('window:confirm', () => true);
      })

      it('makes a request to delete the item', () => {
        cy.get('div.TodoItem:first').within(() => {
          cy.get('img').click()
          cy.wait('@deleteItem')
        })
      })
    })
  })
})
