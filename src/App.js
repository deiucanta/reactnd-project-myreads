import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }
  async updateBook(book, shelf) {
    this.setState(state => {
      // remove the book if exists
      const books = state.books.filter(b => b.id !== book.id)
      // add the book on the shelf
      return { books: books.concat([{ ...book, shelf }])}
    })
    await BooksAPI.update(book, shelf)
  }
  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" component={
          <HomePage books={books} onUpdateBook={this.updateBook.bind(this)} />
        } />
        <Route exact path="/search" component={
          <SearchPage userBooks={books} onUpdateBook={this.updateBook.bind(this)} />
        } />
      </div>
    )
  }
}

export default BooksApp
