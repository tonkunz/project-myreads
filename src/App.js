import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './styles/App.css'
import Shelf from './components/Shelf'

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

  render() {
    let currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    let wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    let read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
                />
                <Shelf 
                  name="Want to Read"
                  books={wantToRead}
                />
                <Shelf 
                  name="Read"
                  books={read}
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
