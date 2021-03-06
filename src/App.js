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
    loading : true
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({books: books})
        this.setState({loading : !this.state.loading})
      })
  }

  swapShelf = (book, event) => {
    const curShelf = book.shelf //Shelf backup for .catch
    book.shelf = event.target.value
  
    //Optimistically Update
    this.setState(c => ({
      ...c.books,
        [book.id] : book
    }))
  
    BooksAPI.update(book, event.target.value)
      .then(() =>
        BooksAPI.getAll().then(books => this.setState({books: books})))
      .catch(() => {
        alert('An error occurred! Try swap shel again later')
        //Reversing UI change
        book.shelf = curShelf
        this.setState(c => ({
          ...c.books,
            [book.id] : book
        }))
      })
  }

  render() {
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        {this.state.loading
          ? <div className='loading-section'>
              <div className='loader'/>
              <h2>Loading Data...</h2>
            </div>
          : <Route exact path='/' render={() => (
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
        }

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