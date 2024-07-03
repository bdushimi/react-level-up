import React from 'react'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css'

import Board from './components/Board'

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  )
}

export default App
