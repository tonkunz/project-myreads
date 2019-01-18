//External libraries/packages dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
//Project especific dependencies
import App from './App'
// Style
import './index.css'

ReactDOM.render(
	<BrowserRouter >
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
