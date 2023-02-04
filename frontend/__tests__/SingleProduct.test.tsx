import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import SingleProduct, { SINGLE_ITEM_QUERY } from "../components/SingleProduct"
import { fakeItem } from "../lib/testUtils"
import { theme } from "../pages/_app"

const product = fakeItem()

const mocks = [
    {
        // When someone requests this query and variable combo
        request: {
            query: SINGLE_ITEM_QUERY,
            variables: {
                id: '123'
            }
        },
        // Return this data
        result: {
            data: {
                Product: product
            }
        }
    }
]

describe('<SingleProduct />', () => {
    it('renders with proper data', async () => {
        // We need to make some fake data
        const {container, debug} = render(
            <MockedProvider mocks={mocks}><ThemeProvider theme={theme}><SingleProduct id="123" /></ThemeProvider></MockedProvider>
        )
        
        // Wait for the test ID to show up
        await screen.findByTestId('singleProduct')
        expect(container).toMatchSnapshot()
    })

    it('Errors out when an item is not found', async () => {
        const errorMock = [
            {
                request: {
                    query: SINGLE_ITEM_QUERY,
                    variables: {
                        id: '123'
                    }
                },
                error: {
                    name: 'Error',
                    message: 'Item not found!!!'
                }
            }
        ]

        const {container, debug} = render(
            <MockedProvider mocks={errorMock}><ThemeProvider theme={theme}><SingleProduct id="123" /></ThemeProvider></MockedProvider>
        )

        
        // Wait for the test ID to show up
        await screen.findByTestId('graphqlError') // always pass an test id in camelCase if not you will get errors
        expect(container).toHaveTextContent('Shoot!')
        expect(container).toHaveTextContent('Item not found!!!')
    })
})