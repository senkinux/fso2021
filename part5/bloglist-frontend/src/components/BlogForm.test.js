import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

test("test for the new blog form", () => {
	const createBlog = jest.fn()
	const component = render(<BlogForm createBlog={createBlog} />)

	const title = component.container.querySelector("#title")
	const author = component.container.querySelector("#author")
	const url = component.container.querySelector("#url")
	const form = component.container.querySelector("form")

	fireEvent.change(title, { target: { value: "Dummy Title" } })
	fireEvent.change(url, { target: { value: "Dummy url" } })
	fireEvent.change(author, { target: { value: "Dummy author" } })
	fireEvent.submit(form)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe("Dummy Title")
	expect(createBlog.mock.calls[0][0].url).toBe("Dummy url")
	expect(createBlog.mock.calls[0][0].author).toBe("Dummy author")
})
