import './index.css'
import {Auth} from './pages/auth/Index'
import {ExpenseTracker} from './pages/expense-tracker/Index'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Auth />} />
        <Route path='/expense-tracker' element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
