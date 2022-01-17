/** @format */

/**
 * External dependencies
 */
import { apiFetch, dispatch } from '@wordpress/data-controls';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import {
	updateDispute,
	updateDisputes,
	updateDisputesSummary,
} from './actions';

/**
 * Retrieve a single dispute from the disputes API.
 *
 * @param {string} id Identifier for specified dispute to retrieve.
 */
export function* getDispute( id ) {
	const path = addQueryArgs( `${ NAMESPACE }/disputes/${ id }` );

	try {
		const result = yield apiFetch( { path } );
		yield updateDispute( result );
	} catch ( e ) {
		yield dispatch(
			'core/notices',
			'createErrorNotice',
			__( 'Error retrieving dispute.', 'woocommerce-payments' )
		);
	}
}

/**
 * Retrieves a series of disputes from the disputes list API.
 *
 * @param {string} query Data on which to parameterize the selection.
 */
export function* getDisputes( query ) {
	const path = addQueryArgs( `${ NAMESPACE }/disputes`, {
		page: query.paged,
		pagesize: query.perPage,
	} );

	try {
		const results = yield apiFetch( { path } ) || {};
		yield updateDisputes( query, results.data );
	} catch ( e ) {
		yield dispatch(
			'core/notices',
			'createErrorNotice',
			__( 'Error retrieving disputes.', 'woocommerce-payments' )
		);
	}
}

export function* getDisputesSummary() {
	try {
		const summary = yield apiFetch( {
			path: `${ NAMESPACE }/disputes/summary`,
		} );
		yield updateDisputesSummary( summary );
	} catch ( e ) {
		yield dispatch(
			'core/notices',
			'createErrorNotice',
			__(
				'Error retrieving the summary of disputes.',
				'woocommerce-payments'
			)
		);
	}
}
