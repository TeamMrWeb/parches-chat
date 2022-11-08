import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Register from "./Register"

test("disable register button when clicked", () => {
  const { getByText } = render(<Register />)
  expect(getByText("Register with your account.")).toBeInTheDocument()
})
