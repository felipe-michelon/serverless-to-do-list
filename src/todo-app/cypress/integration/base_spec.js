describe('When visiting the home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows a friendly message', () => {
    cy.contains('Hello there!')
  })
})
