//External libraries/packages dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
//Project especific dependencies
import * as BooksAPI from './api/BooksAPI'
import Shelf from './components/Shelf'
import Search from './components/Search'
// Style
import './styles/App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({books: books}))
      .catch(e => console.log('error', e))
  }

  swapShelf = (book, event) => {
    BooksAPI.update(book, event.target.value)
      .then(BooksAPI.getAll().then(books => this.setState({books: books})))
  }

  render() {
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf 
                  name="Currently Reading"
                  books={currentlyReading}
                  swapShelf={this.swapShelf}
                />
                <Shelf 
                  name="Want to Read"
                  books={wantToRead}
                  swapShelf={this.swapShelf}
                />
                <Shelf 
                  name="Read"
                  books={read}
                  swapShelf={this.swapShelf}
                />
              </div>
            </div>
            <div className='open-search'>
              <Link to='/search'> Add a book </Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <Search
            swapShelf={this.swapShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp