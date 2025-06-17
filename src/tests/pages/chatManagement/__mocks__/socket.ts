import { vi } from "vitest";

export const mockSocketOnCallbacks: Record<string, (...args: any[]) => void> = {};
export const mockSocketEmit = vi.fn();
export const mockSocketDisconnect = vi.fn();

export const mockSocket = {
  on: (event: string, cb: (...args: any[]) => void) => {
    mockSocketOnCallbacks[event] = cb;
  },
  off: (event: string) => {
    delete mockSocketOnCallbacks[event];
  },
  emit: mockSocketEmit,
  disconnect: mockSocketDisconnect,
};