import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CalendarManagement from '../../../pages/calendarManagement/calendarManagement.js';



vi.mock('../../services/api.service', () => import('../../../services/__mocks__/api.service.js'));

// The factory for vi.mock defines the structure of the mocked module.
vi.mock('../../services/calendar.service', () => {
  return {
    __esModule: true,
    CalendarService: {
      getActiveSelectionData: vi.fn(() =>
        Promise.resolve({
          data: {
            users: [{ id: 1, name: 'John Doe' }],
            accommodations: [{ id: 1, name: 'Cozy Cottage' }],
          }
        })
      ),
    },
  };
});

// Import CalendarService AFTER defining the mocks.
import { CalendarService } from '../../../services/calendar.service.js';

describe('CalendarManagement Component', () => {
  it('renders without crashing', async () => {
    render(<CalendarManagement />);
    // Wait for an element that indicates the initial load (e.g., month name) has completed
    await waitFor(() => {
      expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/i)).toBeInTheDocument();
    });
  });
  // mockActiveData is now at the top level

  beforeEach(() => {
    // Ensure the mock function is reset before each test
    if (vi.isMockFunction(CalendarService.getActiveSelectionData)) {
      (CalendarService.getActiveSelectionData as any).mockClear();
    }
  });

  describe('CalendarManagement Component', () => {
    it('should render the calendar view', async () => {
      // For this test, getActiveSelectionData will use its default mocked implementation (promise with empty data)
      // if no other configuration (like mockResolvedValue) is made here.
    });

    it('affiche le mois courant', async () => {
      render(<CalendarManagement />);
      await waitFor(() => {
        expect(
          screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/i)
        ).toBeInTheDocument();
      });
    });
  });
});
