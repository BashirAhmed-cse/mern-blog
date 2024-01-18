import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/project' element={<Projects/>}/>
       <Route path='/sign-in' element={<Signin/>}/>
       <Route path='/sign-up' element={<Signup/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App