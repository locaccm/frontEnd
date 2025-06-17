// jest.setup.ts

// Mock import.meta.env for Jest environment
Object.defineProperty(global, 'import.meta', {
  value: {
    env: {
      VITE_API_URL: 'http://localhost:3000/test-api',
      VITE_API_KEY: 'test-api-key',
      // Ajoutez ici d'autres variables VITE_ que votre application pourrait utiliser
    },
  },
  writable: true, // Permet aux tests de surcharger si nécessaire
});
