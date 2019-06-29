import React from 'react';
import ReactDOM from 'react-dom';

import { useAjax } from '../src/ajax-hooks';

const App = () => {
    const { loading, error, response, execute } = useAjax(
        'https://helloacm.com/api/random/?n=8',
    );

    let buttonText;
    if (loading) {
        buttonText = 'LOADING';
    } else if (error) {
        buttonText = 'ERROR';
    } else {
        buttonText = response.data
    }

    return (
        <>
            <h1>ajax-hooks Demo</h1>
            <button onClick={execute}>{buttonText}</button>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
