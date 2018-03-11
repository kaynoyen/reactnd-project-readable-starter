import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories } from './actions'
import { Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'

class App extends Component {

  componentDidMount() {
    const { fetchCategories } = this.props
    fetchCategories()
  }

  render() {

    const { categories, isFetching } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
          <NavBar categories={categories} isFetching={isFetching}/>
      </div>
    );
  }
}

function mapStateToProps ({categories}) {
  return {
    categories: categories,
    isFetching: categories.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
