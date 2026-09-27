describe("Login flow", () => {
  /*
   * Test scenarios:
   * 1. User dapat membuka halaman login.
   *
   * 2. User dapat mengisi email dan password.
   *
   * 3. User dapat login dengan kredensial valid.
   *
   * 4. Setelah login berhasil, sesi user dapat dipulihkan.
   *
   * 5. Setelah login berhasil, user diarahkan ke halaman utama.
   */

  it("should login successfully with valid credentials", () => {
    cy.clearLocalStorage();

    cy.visit("/login");

    cy.intercept("POST", "https://forum-api.dicoding.dev/v1/login", {
      statusCode: 200,
      body: {
        status: "success",
        message: "Login berhasil",
        data: {
          token: "e2e-test-token",
        },
      },
    }).as("loginRequest");

    cy.intercept("GET", "https://forum-api.dicoding.dev/v1/users/me", {
      statusCode: 200,
      body: {
        status: "success",
        message: "User berhasil ditemukan",
        data: {
          user: {
            id: "e2e-user-id",
            name: "E2E Testing User",
            email: "e2e-testing@example.com",
          },
        },
      },
    }).as("currentUserRequest");

    cy.get("#email").should("be.visible").type("e2e-testing@example.com");

    cy.get("#password").should("be.visible").type("e2e-testing-password");

    cy.get('button[type="submit"]').should("be.visible").and("contain", "Masuk Sekarang").click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.request.method).to.eq("POST");
      expect(interception.request.url).to.eq("https://forum-api.dicoding.dev/v1/login");

      expect(interception.request.body).to.deep.equal({
        email: "e2e-testing@example.com",
        password: "e2e-testing-password",
      });

      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data.token).to.eq("e2e-test-token");
    });

    cy.wait("@currentUserRequest").then((interception) => {
      expect(interception.request.method).to.eq("GET");
      expect(interception.request.url).to.eq("https://forum-api.dicoding.dev/v1/users/me");

      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data.user.email).to.eq("e2e-testing@example.com");
    });

    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.eq("e2e-test-token");
    });

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
