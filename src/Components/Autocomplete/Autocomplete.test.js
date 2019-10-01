import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Autocomplete from './Autocomplete';

it('Autocomplete check items', async () => {
	const { getByPlaceholderText, getByTestId } = render(
		<Autocomplete
    		minLength="2"
    		delay="250" 
    		items={[
				'Baden-Württemberg',
				'Bayern',
				'Berlin',
				'Brandenburg',
				'Bremen',
				'Hamburg',
				'Hessen',
				'Mecklenburg-Vorpommern',
				'Niedersachsen',
				'Nordrhein-Westfalen',
				'Rheinland-Pfalz',
				'Saarland',
				'Sachsen-Anhalt',
				'Sachsen',
				'Schleswig-Holstein',
				'Thüringen'
    		]}
		/>
	);
	
    fireEvent.change(getByTestId('test-input'), {target: {value: 'br'}});
    const todoList = getByTestId('test-results');
    await wait(() => expect(todoList.children.length).toBe(2) );  
});