import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/sign-in' element={<Signin/>}/>
       <Route path='/sign-up' element={<Signup/>}/>
       <Route element={<PrivateRoute/>}> 
       <Route path='/dashboard' element={<Dashboard/>}/>
       </Route>
       <Route path='/project' element={<Projects/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
