import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock crypto.randomUUID
if (typeof crypto === 'undefined') {
  (global as any).crypto = {
    randomUUID: () => '12345678-1234-4234-8234-123456789012'
  };
} else if (!crypto.randomUUID) {
  (crypto as any).randomUUID = () => '12345678-1234-4234-8234-123456789012';
}
