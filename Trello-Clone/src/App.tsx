import { Provider } from 'react-redux';
import './App.css';
import { store } from './store/store';

import Board from './components/Board';

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  )
}

export default App
