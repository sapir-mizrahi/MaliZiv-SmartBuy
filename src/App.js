import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import ShoppingList from './ShoppingList';
import { NavBar } from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateShoppingList from './NewList';
import logoSmartBuy from './images/logo-smart-white.png';
import HistoryShopping from './HistoryShopping';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <img alt="" className="logo-smart-buy" src={logoSmartBuy} />
        <Routes>
          <Route path='/' element={localStorage.user === undefined ? <Login /> : <ShoppingList />}>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/shoppingList' element={<ShoppingList />}>
          </Route>
          <Route path='/newList' element={<CreateShoppingList />}>
          </Route>
          <Route path='/shoppingHistory' element={<HistoryShopping />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;