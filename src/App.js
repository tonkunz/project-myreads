import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './styles/App.css'
import Shelf from './components/Shelf'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    books : [],
    showSearchPage: false
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

  closeSearch = () => {
    this.setState({showSearchPage : false})
  }

  render() {
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            closeSearch={this.closeSearch}
            swapShelf={this.swapShelf}
            books={this.state.books}
          />
        ) : (
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
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
