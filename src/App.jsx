import TransactionList from './components/TransactionList'

function App() {
  const transactions = [
    {
      id: 1,
      type: "income",
      account: "BCA",
      category: "Food",
      note: "Makan Siang",
      amount: 200000,
      date: "12-05-2026",
    },
    {
      id: 2,
      type: "expense",
      account: "BCA",
      category: "Transport",
      note: "Parkir",
      amount: 10000,
      date: "12-05-2026",
    },
    {
      id: 3,
      type: "income",
      account: "BCA",
      category: "🎁 Gift",
      note: "Dari Robin",
      amount: 500000,
      date: "11-05-2026",
    },
    {
      id: 4,
      type: "income",
      account: "Jago",
      category: "🎁 Gift",
      note: "",
      amount: 500000,
      date: "hehe",
    },
    {
      id: 5,
      type: "income",
      account: "BCA",
      category: "Food",
      note: "crazy longggggggggggggggggggggggggggggggggggggggggg note but actually it should be truncated its not long enough tho now",
      amount: 200000,
      date: "12-05-2026",
    },
  ]

  return (
    <TransactionList transactions={transactions} />
  )
}

export default App
