import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TransactionItem from './components/TransactionItem'

function App() {

  return (
    <div className="flex flex-col items-center gap-1">
      <TransactionItem transaction={{
        id: 1,
        type: "income",
        account: "BCA",
        category: "🎁 Gift",
        note: "Dari Robin",
        amount: 500000,
      }} />
      <TransactionItem transaction={{
        id: 2,
        type: "expense",
        account: "BCA",
        category: "Food",
        note: "Makan Siang",
        amount: 250000,
      }} />
    </div>
  )
}

export default App
