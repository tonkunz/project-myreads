//External libraries/packages dependencies
import React, { Component } from 'react'
//Project especific dependencies
import Book from './Book'

class Shelf extends Component {
	render(){
		//Destructuring ES6
		const {name, books, swapShelf} = this.props

		return(
	    <div className="bookshelf">
	      <h2 className="bookshelf-title">{name}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	        	{books.map(book =>
	        		<li key={book.id}>
	        		  <Book
	        		  	bookInfo={book}
	        		  	swapShelf={swapShelf}
	        		  />
	        		</li>
	        	)}
	        </ol>
	      </div>
	    </div>
		)
	}
}

export default Shelf