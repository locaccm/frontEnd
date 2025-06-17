import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Calendar from './Calendar';
// Mock pour api.service.ts (semble fonctionner)
jest.mock('../services/api.service', () => import('../services/__mocks__/api.service.ts'));

// Mock explicite pour calendar.service.ts
// La factory de jest.mock définit la structure du module simulé.
// Le module original exporte un objet nommé 'CalendarService'.
jest.mock('../services/calendar.service', () => {
  // console.log('calendar.service mock factory executed'); // Pour débogage
  return {
    __esModule: true, // Important pour les modules ES6 avec exportations nommées
    CalendarService: {
      getActiveSelectionData: jest.fn(() => {
        // Fournir une implémentation par défaut qui retourne une promesse résolue avec des données vides
        // pour éviter des erreurs si elle est appelée sans mockResolvedValue spécifique.
        // console.log('mocked CalendarService.getActiveSelectionData called'); // Pour débogage
        return Promise.resolve({ users: [], accommodations: [] });
      }),
      // Si CalendarService a d'autres méthodes utilisées par le composant,
      // elles devraient également être simulées ici. Par exemple :
      // anotherMethod: jest.fn(),
    },
  };
});

// Importer CalendarService APRÈS la définition des mocks.
// En raison du hoisting de jest.mock, cela devrait fonctionner correctement.
import { CalendarService } from '../services/calendar.service';

describe('Calendar Component', () => {
  const mockActiveData = {
    users: [{ id: 1, name: 'John Doe' }],
    accommodations: [{ id: 101, name: 'Cozy Cottage' }],
  };

  beforeEach(() => {
    // Ensure the mock function is reset before each test
    if (jest.isMockFunction(CalendarService.getActiveSelectionData)) {
      (CalendarService.getActiveSelectionData as jest.Mock).mockClear();
    } else {
      console.error('TEST ERROR: CalendarService.getActiveSelectionData is NOT a mock function!');
    }
  });

  it('should render the calendar view', () => {
    // Pour ce test, getActiveSelectionData utilisera son implémentation mockée par défaut (promesse avec données vides)
    // si aucune autre configuration (comme mockResolvedValue) n'est faite ici.
    render(<Calendar />);
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/i)).toBeInTheDocument();
  });

  it('should fetch active selection data on mount and populate dropdowns', async () => {
    // Ensure CalendarService.getActiveSelectionData is a mock and set its resolved value
    if (jest.isMockFunction(CalendarService.getActiveSelectionData)) {
      (CalendarService.getActiveSelectionData as jest.Mock).mockResolvedValue(mockActiveData);
    } else {
      console.error('TEST ERROR (dropdowns): CalendarService.getActiveSelectionData is NOT a mock function!');
    }

    render(<Calendar />);

    // Switch to 'day' view to ensure the event form is visible
    const dayButton = screen.getByRole('button', { name: /Day/i });
    dayButton.click();

    // Ensure the service method was called
    expect(CalendarService.getActiveSelectionData).toHaveBeenCalledTimes(1);

    // Wait for the dropdowns to be populated with the mock data
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Cozy Cottage')).toBeInTheDocument();
    });
  });
});
