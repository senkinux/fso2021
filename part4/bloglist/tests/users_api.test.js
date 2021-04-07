const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

const api = supertest(app)

describe("one user initially in db", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("pwd123", 10)
		const user = new User({ username: "dummy", passwordHash })

		await user.save()
	})

	test("valid user is created", async () => {
		const usersInDb = await User.find({})

		const newUser = {
			name: "Bob Ross",
			username: "bobross",
			password: "art123",
		}

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/)

		const usersInDbAfter = await User.find({})
		expect(usersInDbAfter).toHaveLength(usersInDb.length + 1)

		const usernames = usersInDbAfter.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test("if username taken, server sends proper status code and error message", async () => {
		const userInDb = await User.find({})

		const newUser = {
			username: "dummy",
			name: "dummy",
			password: "dummy",
		}

		const res = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		expect(res.body.error).toContain("username must be unique")

		const usersAfter = await User.find({})
		expect(usersAfter).toHaveLength(userInDb.length)
	})
})

afterAll(() => mongoose.connection.close())
