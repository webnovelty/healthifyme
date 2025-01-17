import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";

describe("LandingPage", () => {
  it("renders the header text", () => {
    render(<LandingPage setAuthenticated={() => {}} />);
    expect(screen.getByText(/Your Health, Your Way/i)).toBeInTheDocument();
  });

  it("shows error toast when registration fails", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject({
        response: { data: { message: "Registration failed" } },
      })
    );

    render(<LandingPage setAuthenticated={() => {}} />);

    fireEvent.click(screen.getByText("Join Us"));
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    const errorToast = await screen.findByText(/Registration failed/i);
    expect(errorToast).toBeInTheDocument();
  });
});
