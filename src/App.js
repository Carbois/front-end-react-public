import React from 'react';
import ReactDOM from 'react-dom';
//import Card from './components/Card'; // Adjust the path if necessary
//import Filter from './components/Filter'; // Adjust the path if necessary




class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                Hello World
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App; // This line is important