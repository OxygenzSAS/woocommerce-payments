/**
 * External dependencies
 */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import { WoopayExpressCheckoutButton } from '../woopay-express-checkout-button';
import { expressCheckoutIframe } from '../express-checkout-iframe';
import WCPayAPI from 'wcpay/checkout/api';

jest.mock( '../express-checkout-iframe', () => ( {
	__esModule: true,
	expressCheckoutIframe: jest.fn(),
} ) );

describe( 'WoopayExpressCheckoutButton', () => {
	const buttonSettings = {
		type: 'default',
		text: 'WooPay Express Button',
		height: '48px',
		size: 'medium',
		theme: 'dark',
	};
	const api = new WCPayAPI( {}, jest.fn() );

	beforeEach( () => {
		expressCheckoutIframe.mockImplementation( () => jest.fn() );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	test( 'render the express checkout button', () => {
		render(
			<WoopayExpressCheckoutButton
				isPreview={ false }
				buttonSettings={ buttonSettings }
				api={ api }
			/>
		);

		expect(
			screen.queryByRole( 'button', { name: 'WooPay Express Button' } )
		).toBeInTheDocument();
	} );

	test( 'call `expressCheckoutIframe` on button click when `isPreview` is false', () => {
		render(
			<WoopayExpressCheckoutButton
				isPreview={ false }
				buttonSettings={ buttonSettings }
				api={ api }
			/>
		);

		const expressButton = screen.queryByRole( 'button', {
			name: 'WooPay Express Button',
		} );
		userEvent.click( expressButton );

		expect( expressCheckoutIframe ).toHaveBeenCalledWith( api );
	} );

	test( 'should not call `expressCheckoutIframe` on button click when `isPreview` is true', () => {
		render(
			<WoopayExpressCheckoutButton
				isPreview={ true }
				buttonSettings={ buttonSettings }
				api={ api }
			/>
		);

		const expressButton = screen.queryByRole( 'button', {
			name: 'WooPay Express Button',
		} );
		userEvent.click( expressButton );

		expect( expressCheckoutIframe ).not.toHaveBeenCalled();
	} );
} );
