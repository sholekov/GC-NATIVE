import { toHumanReadable } from '@/utils/helpers';

describe('toHumanReadable', () => {
    it('should format USD correctly', () => {
        expect(toHumanReadable(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('should format EUR correctly', () => {
        expect(toHumanReadable(1234.56, 'EUR').replace(/\s+/g, ' ').trim()).toBe('1.234,56 €'.replace(/\s+/g, ' ').trim());
    });

    it('should format GBP correctly', () => {
        expect(toHumanReadable(1234.56, 'GBP')).toBe('£1,234.56');
    });

    it('should format BGN correctly', () => {
        expect(toHumanReadable(1234.56, 'BGN')).toBe('1 234,56 лв.');
    });

    it('should format RON correctly', () => {
        expect(toHumanReadable(1234.56, 'RON')).toBe('1.234,56 lei');
    });

    it('should throw an error for unsupported currencies', () => {
        expect(() => toHumanReadable(1234.56, 'XYZ')).toThrow('Unsupported currency');
    });
});
