import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'
import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import Navigation from './components/Navigation'
import ListPosts from './components/ListPosts'
import ListComments from './components/ListComments'
import EditPost from './components/EditPost'

class App extends Component {

  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props

    fetchCategories()
    fetchPosts()
  }

  render() {

    const { categories, posts } = this.props

    return (
      <div>

        <header className="App-header">
          <h1 className="App-title"><Link style={{color: 'white', textDecoration: 'none'}} to="/">Readable</Link></h1>
        </header>
        <div>
          <Route exact path="/" component={Navigation}/>
          <Route exact path="/:category?" component={ListPosts}/>
          <Route exact path="/:category/:id" component={ListComments}/>
          <Route path="/:category/:id/edit" exact component={EditPost}/>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
