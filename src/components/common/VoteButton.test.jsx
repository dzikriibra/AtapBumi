import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThumbsUp } from "lucide-react";

import VoteButton from "./VoteButton";

describe("VoteButton component", () => {
  /*
   * Test scenarios:
   * 1. VoteButton harus menampilkan jumlah vote dan label
   *    sesuai dengan kondisi inactive.
   *
   * 2. VoteButton harus menggunakan activeLabel ketika active.
   *
   * 3. VoteButton harus menjalankan onClick ketika tombol diklik.
   *
   * 4. VoteButton harus disabled ketika disabled bernilai true.
   */

  it("should render vote count and inactive label", () => {
    render(<VoteButton icon={ThumbsUp} count={5} active={false} onClick={vi.fn()} disabled={false} activeLabel="Batalkan like thread" inactiveLabel="Like thread" />);

    const button = screen.getByRole("button", {
      name: "Like thread",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("5");
  });

  it("should use active label when vote button is active", () => {
    render(<VoteButton icon={ThumbsUp} count={10} active onClick={vi.fn()} disabled={false} activeLabel="Batalkan like thread" inactiveLabel="Like thread" />);

    expect(
      screen.getByRole("button", {
        name: "Batalkan like thread",
      }),
    ).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    const handleClick = vi.fn();

    render(<VoteButton icon={ThumbsUp} count={3} active={false} onClick={handleClick} disabled={false} activeLabel="Batalkan like thread" inactiveLabel="Like thread" />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Like thread",
      }),
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<VoteButton icon={ThumbsUp} count={3} active={false} onClick={vi.fn()} disabled activeLabel="Batalkan like thread" inactiveLabel="Like thread" />);

    expect(
      screen.getByRole("button", {
        name: "Like thread",
      }),
    ).toBeDisabled();
  });
});
