import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf'

const filterBooks = (books, shelf) =>
  books.filter(b => b.shelf === shelf)

const HomePage = ({ books, onUpdateBook }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <Bookshelf
          title="Currently Reading"
          books={filterBooks(books, 'currentlyReading')}
          onUpdateBook={onUpdateBook}
        />
        <Bookshelf
          title="Want to Read"
          books={filterBooks(books, 'wantToRead')}
          onUpdateBook={onUpdateBook}
        />
        <Bookshelf
          title="Read"
          books={filterBooks(books, 'read')}
          onUpdateBook={onUpdateBook}
        />
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
)

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func,
}

export default HomePage