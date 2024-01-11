import Home from './Home/Home'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './AdminSection/LoginForm/Login';
import NavBar from './NavBar/NavBar';
import ItemsHome from './ItemsByPlace/ItemsHome/ItemsHome';
import ClaimHomePage from './ClaimSection/ClaimHomePage/ClaimHomePage';
import AddNewItem from './AdminSection/AddNewItem/AddNewItem';
import ViewAllCards from './AdminSection/AlllItemsReported/ViewAllCards';
import Claims from './AdminSection/ClaimsDone/Claims';
// import Login from './AdminSection/LoginForm/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Routes>
          <Route path='/' element={< Login />}></Route>
          <Route path='/home' element={< Home />}></Route>
          <Route path='/login' element={< Login />}></Route>
          <Route path='/place/:at' element={<ItemsHome />}></Route>
          <Route path='/claimSection/:place/:catagory/:subCatagory' element={<ClaimHomePage />}></Route>
          <Route path='/addItem' element={<AddNewItem />}></Route>
          <Route path='/viewAllItems' element={<ViewAllCards />}></Route>
          <Route path='/claims' element={<Claims />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
