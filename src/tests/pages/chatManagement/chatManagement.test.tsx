import { describe, it, beforeEach, expect, vi } from "vitest";

const mockSocketOnCallbacks: Record<string, (...args: any[]) => void> = {};
const mockSocketEmit = vi.fn();

export { mockSocketEmit, mockSocketOnCallbacks };

vi.mock("socket.io-client", () => {
  const mockSocketEmit = vi.fn();
  const mockSocketOnCallbacks: Record<string, (...args: any[]) => void> = {};
  return {
    io: () => ({
      on: (event: string, cb: (...args: any[]) => void) => {
        mockSocketOnCallbacks[event] = cb;
      },
      off: (event: string) => {
        delete mockSocketOnCallbacks[event];
      },
      emit: mockSocketEmit,
      disconnect: vi.fn(),
    }),
  };
});

vi.mock("../../../core/api/chatManagement/chatApi.js", () => ({
  getUserById: vi.fn(),
  getTenantsByOwner: vi.fn(),
  getOwnerByTenant: vi.fn(),
  getMessages: vi.fn(),
  sendMessage: vi.fn(),
}));

import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import type { Mock } from "vitest";
import ChatManagement from "../../../pages/chatManagement/chatManagement.js";

import {
  getUserById,
  getTenantsByOwner,
  getOwnerByTenant,
  getMessages,
  sendMessage,
} from "../../../core/api/chatManagement/chatApi.js";

const mockedGetUserById   = getUserById   as Mock;
const mockedGetTenantsByOwner = getTenantsByOwner as Mock;
const mockedGetOwnerByTenant  = getOwnerByTenant  as Mock;
const mockedGetMessages  = getMessages  as Mock;
const mockedSendMessage = sendMessage as Mock;

beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
  for (const key in mockSocketOnCallbacks) delete mockSocketOnCallbacks[key];
});


describe("ChatManagement", () => {
  it("displays a message if user is not logged in", () => {
    render(<ChatManagement />);
    expect(screen.getByText(/Utilisateur non connecté/i)).toBeInTheDocument();
  });

  it("loads contacts and displays their names", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValue([]);

    render(<ChatManagement />);

    expect(await screen.findByText("Alice DOE")).toBeInTheDocument();
    expect(await screen.findByText("Bob SMITH")).toBeInTheDocument();
  });

  it("selects a contact and displays messages", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValue([
      { MESN_SENDER: 1, MESC_CONTENT: "Hi Bob" },
      { MESN_SENDER: 2, MESC_CONTENT: "Hi Alice" },
    ]);

    render(<ChatManagement />);

    const bobContact = await screen.findByText("Bob SMITH");
    fireEvent.click(bobContact);

    expect(await screen.findByText("Hi Bob")).toBeInTheDocument();
    expect(await screen.findByText("Hi Alice")).toBeInTheDocument();
  });

  it("sends a message", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValueOnce([]);

    mockedSendMessage.mockResolvedValue({});
    mockedGetMessages.mockResolvedValueOnce([
      { MESN_SENDER: 1, MESC_CONTENT: "Hello Bob" },
    ]);

    render(<ChatManagement />);

    const bobContact = await screen.findByText("Bob SMITH");
    fireEvent.click(bobContact);

    const input = await screen.findByPlaceholderText("Message...");
    fireEvent.change(input, { target: { value: "Hello Bob" } });

    const sendButton = screen.getByText("Envoyer");
    fireEvent.click(sendButton);

    expect(mockedSendMessage).toHaveBeenCalledWith(1, 2, "Hello Bob");

    await waitFor(() => {
      expect(screen.getByText("Hello Bob")).toBeInTheDocument();
    });
  });

  it("does not send an empty message", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValue([]);

    render(<ChatManagement />);

    const bobContact = await screen.findByText("Bob SMITH");
    fireEvent.click(bobContact);

    const sendButton = screen.getByText("Envoyer");
    fireEvent.click(sendButton);

    expect(mockedSendMessage).not.toHaveBeenCalled();
  });

  it("fetches messages when selecting a contact", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValue([]);

    render(<ChatManagement />);

    const bobContact = await screen.findByText("Bob SMITH");
    fireEvent.click(bobContact);

    await waitFor(() => {
      expect(mockedGetMessages).toHaveBeenCalledWith(1, 2);
    });
  });

  it("handles tenant with no owner", async () => {
    sessionStorage.setItem("userId", "2");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 2,
      USEC_TYPE: "TENANT",
      USEC_FNAME: "Charlie",
      USEC_LNAME: "Delta",
    });

    mockedGetOwnerByTenant.mockResolvedValue(null);
    mockedGetMessages.mockResolvedValue([]);

    render(<ChatManagement />);

    expect(await screen.findByText("Charlie DELTA")).toBeInTheDocument();
  });

  it("receives socket message and appends it", async () => {
    sessionStorage.setItem("userId", "1");

    mockedGetUserById.mockResolvedValue({
      USEN_ID: 1,
      USEC_TYPE: "OWNER",
      USEC_FNAME: "Alice",
      USEC_LNAME: "Doe",
    });

    mockedGetTenantsByOwner.mockResolvedValue([
      {
        USEN_ID: 2,
        USEC_TYPE: "TENANT",
        USEC_FNAME: "Bob",
        USEC_LNAME: "Smith",
      },
    ]);

    mockedGetMessages.mockResolvedValue([]);

    render(<ChatManagement />);

    const bobContact = await screen.findByText("Bob SMITH");
    fireEvent.click(bobContact);

    await act(async () => {
      mockSocketOnCallbacks["chat message"]?.({
        from: 2,
        to: 1,
        message: "New socket message",
      });
    });

    expect(await screen.findByText("New socket message")).toBeInTheDocument();
  });
});
