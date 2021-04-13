describe("Blog App", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")
		const user = { username: "Bobby", password: "bob123", name: "Bob Ross" }
		cy.request("POST", "http://localhost:3003/api/users", user)
		cy.visit("http://localhost:3000")
	})
	it("Login form is shown", function () {
		cy.contains("login into application")
		cy.contains("login")
	})

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#username").type("Bobby")
			cy.get("#password").type("bob123")
			cy.get("#login-btn").click()
			cy.contains("Bobby is logged in")
			cy.contains("blogs")
		})

		it("fails with wrong credentials", function () {
			cy.get("#username").type("Ronnie")
			cy.get("#password").type("bob123")
			cy.get("#login-btn").click()
			cy.contains("incorrect username or password").should(
				"have.css",
				"color",
				"rgb(255, 0, 0)"
			)
		})
	})

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "Bobby", password: "bob123" })
		})

		it("A blog can be created", function () {
			cy.createBlog({ author: "mario", title: "supermario", url: "mario.io" })
		})
	})
})
