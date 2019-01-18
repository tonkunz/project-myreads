import React, { Component } from 'react'
import noThumb from '../icons/no-thumb.svg'

class Book extends Component {
	render(){
		//Destructuring ES6
		const {bookInfo, swapShelf} = this.props

		//Book thumbnail link handling
		const bookThumb = bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ?
		bookInfo.imageLinks.thumbnail : noThumb

		return(
	    <div className="book">
	      <div className="book-top">
	        <div className="book-cover" 
	        	style={{ width: 128, height: 193, backgroundImage: `url(${bookThumb})` }}
	        >
	        </div>
	        <div className="book-shelf-changer">
	          <select
	          	value={bookInfo.shelf}
	          	onChange={event => swapShelf(bookInfo, event)}
	          >
	            <option value="move" disabled>Move to...</option>
	            <option value="currentlyReading">Currently Reading</option>
	            <option value="wantToRead">Want to Read</option>
	            <option value="read">Read</option>
	            <option value="none">None</option>
	          </select>
	        </div>
	      </div>
	      <div className="book-title">{bookInfo.title}</div>
	      {bookInfo.authors && bookInfo.authors.map((author, i) =>
	      	<div key={i} className="book-authors">{author}</div>
	      )}
	    </div>			
		)
	}
}

export default Book