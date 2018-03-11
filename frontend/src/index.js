import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
	)

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App store={store}/>
		</Router>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
