import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LoginPrompt from "./LoginPrompt";

describe("LoginPrompt component", () => {
  /*
   * Test scenarios:
   * 1. LoginPrompt tidak boleh dirender ketika isOpen bernilai false.
   *
   * 2. LoginPrompt harus menampilkan dialog ketika isOpen bernilai true.
   *
   * 3. Tombol "Nanti" harus memanggil onClose ketika diklik.
   *
   * 4. Tombol "Masuk" harus mengarah ke halaman login dan memanggil onClose.
   */

  it("should not render when isOpen is false", () => {
    render(
      <MemoryRouter>
        <LoginPrompt isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render dialog when isOpen is true", () => {
    render(
      <MemoryRouter>
        <LoginPrompt isOpen onClose={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Kamu belum masuk",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Login diperlukan untuk vote")).toBeInTheDocument();
  });

  it('should call onClose when "Nanti" is clicked', () => {
    const handleClose = vi.fn();

    render(
      <MemoryRouter>
        <LoginPrompt isOpen onClose={handleClose} />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Nanti",
      }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should navigate to login and call onClose when "Masuk" is clicked', () => {
    const handleClose = vi.fn();

    render(
      <MemoryRouter>
        <LoginPrompt isOpen onClose={handleClose} />
      </MemoryRouter>,
    );

    const loginLink = screen.getByRole("link", {
      name: /Masuk/i,
    });

    expect(loginLink).toHaveAttribute("href", "/login");

    fireEvent.click(loginLink);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
