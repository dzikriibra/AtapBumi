describe("Login flow", () => {
  /*
   * Test scenarios:
   * 1. User dapat membuka halaman login.
   *
   * 2. User dapat login menggunakan akun yang valid.
   *
   * 3. Setelah login berhasil, user diarahkan ke halaman utama.
   */
  it("should login successfully with valid credentials", () => {
    cy.visit("/login");

    cy.intercept("POST", "**/login").as("loginRequest");

    cy.env(["TEST_EMAIL", "TEST_PASSWORD"]).then(({ TEST_EMAIL, TEST_PASSWORD }) => {
      cy.get("#email").should("be.visible").type(TEST_EMAIL);
      cy.get("#password").should("be.visible").type(TEST_PASSWORD);
    });

    cy.get('button[type="submit"]').should("be.visible").and("contain", "Masuk Sekarang").click();

    cy.wait("@loginRequest").then((interception) => {
      cy.log(`Login URL: ${interception.request.url}`);
      cy.log(`Login method: ${interception.request.method}`);
      cy.log(`Login status: ${interception.response?.statusCode ?? "no response"}`);

      expect(interception.request.method).to.eq("POST");
      expect(interception.request.url).to.eq("https://forum-api.dicoding.dev/v1/login");
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
