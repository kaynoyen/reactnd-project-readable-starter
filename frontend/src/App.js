import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'

import NavBar from './components/NavBar'

import ListPosts from './components/ListPosts'

class App extends Component {

  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props
    fetchCategories()
    fetchPosts()
  }

  render() {

    const { categories, posts } = this.props

    console.log(posts)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
          <NavBar className="nav-bar" categories={categories} isFetching={categories.isFetching}/>
        </header>
          
          
          <ListPosts posts={posts} isFetching={posts.isFetching}/>
      </div>
    );
  }
}

function mapStateToProps ({categories, posts}) {
  return {
    categories: categories,
    posts: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
