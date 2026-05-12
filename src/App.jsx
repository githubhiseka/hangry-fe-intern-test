import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TransactionItem from './components/TransactionItem'
import DateGroup from './components/DateGroup'

function App() {

  return (
    <div className="flex flex-col items-center gap-1">
      <DateGroup label="Today" dailyTotal={250000} transactions={[
        {
          id: 1,
          type: "income",
          account: "BCA",
          category: "Food",
          note: "Makan Siang",
          amount: 200000,
        },
        {
          id: 2,
          type: "income",
          account: "BCA",
          category: "🎁 Gift",
          note: "Dari Robin",
          amount: 500000,
        },
        {
          id: 3,
          type: "income",
          account: "BCA",
          category: "🎁 Gift",
          note: "Dari Robin",
          amount: 500000,
        },
        {
          id: 4,
          type: "income",
          account: "BCA",
          category: "🎁 Gift",
          note: "Dari Robin",
          amount: 500000,
        },
      ]} />
    </div>
  )
}

export default App
