import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header.tsx'
import List from './pages/List.tsx'
import Detail from './pages/Detail.tsx'
import Write from './pages/Write.tsx'
import Home from './pages/Home.tsx'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/write" element={<Write/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
