import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {
  state = {
    books: []
  }
  async search(event) {
    const query = event.target.value
    if (query === '') {
      this.setState({ books: [] })
    } else {
      const books = await BooksAPI.search(query, 30)
      if (books.error) {
        this.setState({ books: [] })
      } else {
        this.setState({ books })
      }
    }
  }
  getCurrentShelf(book) {
    const { userBooks } = this.props
    const foundBook = userBooks.find(b => b.id === book.id)

    return foundBook ? foundBook.shelf : 'none'
  }
  render() {
    const { books } = this.state
    const { onUpdateBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.search.bind(this)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} shelf={this.getCurrentShelf(book)} onChangeShelf={shelf => onUpdateBook(book, shelf)} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  userBooks: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func,
}

export default SearchPage