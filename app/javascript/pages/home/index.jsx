import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Header from './header';
import TableHeader from './tableHeader';
import Searchbar from './searchbar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

const Index = () => (
  <Fragment>
    <Header/>
    <Searchbar/>
    <TableHeader/>

  </Fragment>
)

const store = createStore(reducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Index/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Index
