import {Routes, Route, Outlet} from 'react-router-dom'
import Home from "./Pages/Home";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import RecipeDetails from './Pages/RecipeDetails';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import Account from './Pages/Account';
import ProtectedRoute from './Components/ProtectedRoute';
import Upload from './Pages/Upload';
import Favourite from './Pages/Favourite';

function Layout(){
  return (
    <>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </>
  )
}
function App() {
  return (
    <div className='bg-black'>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />
          <Route path='/upload' element={<ProtectedRoute><Upload/></ProtectedRoute>} />
          <Route path='/favourite' element={<ProtectedRoute><Favourite /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route index element={<Home />} />
          <Route path='recipes/:id' element={<RecipeDetails />} />
        </Route>
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
