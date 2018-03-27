import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from './actions'
import { Route, Link, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'

import Navigation from './components/Navigation'
import ListPosts from './components/ListPosts'
import ListComments from './components/ListComments'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import NewPost from './components/NewPost'

class App extends Component {

  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props

    fetchCategories()
    fetchPosts()
  }

  render() {

    return (
      <div>

        <header className="App-header">
          <h1 className="App-title"><Link style={{color: 'white', textDecoration: 'none'}} to="/">Readable</Link></h1>
          <Link to="/new"><button className='post-button'>new post</button></Link>      

        </header>
        <div>
          <Route path="/" component={Navigation}/>
          <Route exact path="/new" component={NewPost}/>
          <Switch>
            <Route path="/:category/:pid/:cid/edit" component={EditComment}/>
            <Route path="/:category/:pid/edit" component={EditPost}/>
            <Route path="/:category?/:pid?" component={ListPosts}/>
          </Switch>
          <Route exact path="/:category/:pid" component={ListComments}/>
          
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
