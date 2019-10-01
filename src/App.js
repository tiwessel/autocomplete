import React from 'react';
import './App.css';
import Autocomplete from './Components/Autocomplete/Autocomplete';

function App()
{
	return (
		<div className="App">
			<header className="App-header">
				<Autocomplete 
					name="Hans" 
					className="Test"
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
			</header>
		</div>
	);
}
export default App;