import './App.css'

import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CakeIcon, ArchiveBoxIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline'

import Header from './components/Header.tsx'
import List from './pages/List.tsx'
import Detail from './pages/Detail.tsx'
import Write from './pages/Write.tsx'
import Home from './pages/Home.tsx'

import data from "./datas/mock-up.json"

const BG_ICONS = [
  { Icon: CakeIcon,        top: '3%',  left: '5%',  size: 40, rotate: -15 },
  { Icon: SparklesIcon,    top: '2%',  left: '28%', size: 28, rotate: 10  },
  { Icon: ArchiveBoxIcon,  top: '5%',  left: '52%', size: 44, rotate: 8   },
  { Icon: ShoppingBagIcon, top: '3%',  left: '78%', size: 32, rotate: -8  },
  { Icon: SparklesIcon,    top: '16%', left: '2%',  size: 22, rotate: 20  },
  { Icon: CakeIcon,        top: '18%', left: '20%', size: 36, rotate: -12 },
  { Icon: ShoppingBagIcon, top: '15%', left: '43%', size: 30, rotate: 6   },
  { Icon: ArchiveBoxIcon,  top: '19%', left: '67%', size: 38, rotate: -8  },
  { Icon: CakeIcon,        top: '16%', left: '90%', size: 28, rotate: 14  },
  { Icon: ArchiveBoxIcon,  top: '32%', left: '10%', size: 34, rotate: 18  },
  { Icon: SparklesIcon,    top: '35%', left: '33%', size: 24, rotate: -15 },
  { Icon: CakeIcon,        top: '30%', left: '57%', size: 40, rotate: 10  },
  { Icon: ShoppingBagIcon, top: '33%', left: '82%', size: 26, rotate: -20 },
  { Icon: CakeIcon,        top: '48%', left: '3%',  size: 36, rotate: 22  },
  { Icon: ArchiveBoxIcon,  top: '45%', left: '27%', size: 28, rotate: -6  },
  { Icon: SparklesIcon,    top: '50%', left: '50%', size: 32, rotate: 12  },
  { Icon: CakeIcon,        top: '46%', left: '74%', size: 38, rotate: -18 },
  { Icon: ShoppingBagIcon, top: '48%', left: '93%', size: 24, rotate: 8   },
  { Icon: SparklesIcon,    top: '62%', left: '12%', size: 26, rotate: -10 },
  { Icon: ShoppingBagIcon, top: '65%', left: '36%', size: 40, rotate: 16  },
  { Icon: ArchiveBoxIcon,  top: '60%', left: '62%', size: 30, rotate: -14 },
  { Icon: CakeIcon,        top: '63%', left: '86%', size: 34, rotate: 20  },
  { Icon: ArchiveBoxIcon,  top: '76%', left: '5%',  size: 28, rotate: -22 },
  { Icon: SparklesIcon,    top: '78%', left: '28%', size: 42, rotate: 8   },
  { Icon: CakeIcon,        top: '74%', left: '54%', size: 26, rotate: -12 },
  { Icon: ShoppingBagIcon, top: '77%', left: '78%', size: 36, rotate: 18  },
  { Icon: CakeIcon,        top: '90%', left: '14%', size: 32, rotate: 14  },
  { Icon: ArchiveBoxIcon,  top: '88%', left: '40%', size: 38, rotate: -8  },
  { Icon: SparklesIcon,    top: '92%', left: '65%', size: 28, rotate: 10  },
  { Icon: ShoppingBagIcon, top: '89%', left: '88%', size: 40, rotate: -16 },
]

function App() {
  const [lunches, setLunches] = useState(()=>{
    const saved = localStorage.getItem('lunches')
    return saved? JSON.parse(saved) : data
  })

  useEffect(()=>{
    localStorage.setItem('lunches', JSON.stringify(lunches))
  }, [lunches])

  const addLunch = (item)=> setLunches(prev=> [...prev, item])
  const updateLunch = (id, updated)=> setLunches(prev=> prev.map(item=>item.id ===id? {...item, ...updated} : item))
  const deleteLunch = (id) => setLunches(prev=> prev.filter(item => item.id !== id))

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {BG_ICONS.map(({ Icon, top, left, size, rotate }, i) => (
          <Icon
            key={i}
            className="absolute pointer-events-none text-white"
            style={{ top, left, width: size, height: size, transform: `rotate(${rotate}deg)`, opacity: 0.6 }}
          />
        ))}
        <div className="relative z-10">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/detail/:id" element={<Detail/>} />
            <Route path="/write" element={<Write/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
