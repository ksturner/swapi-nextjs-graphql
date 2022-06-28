import { render, screen } from '@testing-library/react';
import SearchPage from '../pages/index';

describe('SearchPage', () => {
    it('renders a heading', () => {
        render(<SearchPage />);

        const heading = screen.getByRole('heading', {
            name: /StarWars Character Search/i,
        });
        expect(heading).toBeInTheDocument();
    });
});
