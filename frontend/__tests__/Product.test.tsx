import {render, screen} from '@testing-library/react'
import Product from '../components/Product'
import { MockedProvider } from "@apollo/client/testing";
import { fakeItem } from '../lib/testUtils';
import { ThemeProvider } from 'styled-components';
import { theme } from '../pages/_app';

const product = fakeItem();

describe('<Product />', () => {
    it('renders out the price tag and title', () => {
        const {container, debug} = render(<MockedProvider><ThemeProvider theme={theme}><Product product={product} /></ThemeProvider></MockedProvider>)

        const priceTag = screen.getByText('$50')
        expect(priceTag).toBeInTheDocument();

       const link = container.querySelector('a')

       debug(link)

       expect(link).toHaveAttribute('href', '/product/abc123')
       expect(link).toHaveTextContent(product.name)
    })

    it('Renders and matches the snapshot', () => {
        const {container, debug} = render(<MockedProvider><ThemeProvider theme={theme}><Product product={product} /></ThemeProvider></MockedProvider>)

        expect(container).toMatchSnapshot();
    })
    it('renders the image properly', () => {
        const {container, debug} = render(<MockedProvider><ThemeProvider theme={theme}><Product product={product} /></ThemeProvider></MockedProvider>)

        // grab the image
        const img = screen.getByAltText(product.name)
        expect(img).toBeInTheDocument();
    })
})