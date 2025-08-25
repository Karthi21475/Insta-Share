import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginpage.jsx'
import Signup from './pages/signuppage.jsx'
import Homepage from './pages/Homepage.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import SearchPage from "./pages/searchPage.jsx";
import AddPostPage from './pages/AddPostPage.jsx'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
      <Route path='/search' element={<SearchPage/>}></Route>
      <Route path='/uploadPost/:user_id' element={<AddPostPage/>}></Route>
      <Route path='*' element={<h1>Not Found</h1>}></Route>
    </Routes>
  );
}

export default App
