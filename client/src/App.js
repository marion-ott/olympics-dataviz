import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const url = 'http://localhost:3000/games'
    fetch(url)
      .then(response => response.json()
      .then(data => ({status: response.status, body: data})))
      .then(data => console.log(data.body));
    }
  render() {
    return(
      <div>test</div>
    )
  }
}

export default App;
