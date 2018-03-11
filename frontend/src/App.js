import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { fetchCategories } from './actions'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data',
      categories: 'empty'
    }
  }

  componentDidMount() {
    const { fetchCategories } = this.props
    fetchCategories()
  }

  render() {



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Well, React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br/>
          {this.state.categories}
        </p>
      </div>
    );
  }
}

function mapStateToProps ({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
