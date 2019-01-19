//External libraries/packages dependencies
import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//Project especific dependencies
import * as BooksAPI from '../api/BooksAPI'
import Book from './Book'

class Search extends Component {
	state = {
		query : '',
		books : []
	}

	handleQuery = (query) => {
		this.setState(() => ({
			query : query
		}))

		query ? (
			BooksAPI.search(query)
				.then(books => {
					if (books.length > 0){
						//Checking shelf
						books.forEach( item => {
							const checkedBook = this.props.books.find(book => book.id === item.id)
							if(checkedBook) {item.shelf = checkedBook.shelf} else {item.shelf = "none"}
						})
						this.setState({books : books})
					} else {
						this.setState({books : []})
					}
				})				
		) : (
			this.setState({books : []})
		)
	}

	render(){

		return(
			<div className="search-books">
        <div className="search-books-bar">
        	<Link to='/' className="close-search"> Close </Link>
					<div className="search-books-input-wrapper">
            <input
            	type="text"
            	placeholder="Search by title or author"
            	value={this.state.query}
            	onChange={(event) => this.handleQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          	{
          		this.state.books.map(book =>
	        		<li key={book.id}>
	        		  <Book
	        		  	bookInfo={book}
	        		  	swapShelf={this.props.swapShelf}
	        		  />
	        		</li>)
          	}
          </ol>
        </div>
      </div>
		)
	}
}

Search.propTypes = {
	books: PropTypes.array.isRequired,
	swapShelf: PropTypes.func.isRequired,
}

export default Search