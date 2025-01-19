import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { userLogin } from "@/actions/login";

// npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom --save-dev


// Mock the userLogin function
jest.mock("@/actions/login", () => ({
  userLogin: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty form submission", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/email must be at least 2 characters./i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 2 characters./i)).toBeInTheDocument();
    });
  });

  it("calls userLogin function with correct data on form submission", async () => {
    const mockLoginResponse = { success: true };
    userLogin.mockResolvedValue(mockLoginResponse);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password");

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
  });

  it("displays an error message on login failure", async () => {
    const mockLoginResponse = { error: "Invalid credentials" };
    userLogin.mockResolvedValue(mockLoginResponse);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password");

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("displays a success message on login success", async () => {
    const mockLoginResponse = { success: true };
    userLogin.mockResolvedValue(mockLoginResponse);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password");

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
    });
  });
});
