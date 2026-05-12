export const ACCOUNTS = ["BCA", "Jago"];

export const CATEGORIES = {
  expense: ["Food", "Shopping", "Transport", "Bills", "Entertainment", "Other"],
  income: ["Salary", "Freelance", "Gift", "Investment", "Other"],
};

export const ACCOUNT_COLORS = {
  BCA: "text-bca",
  Jago: "text-jago",
};

export const DEFAULT_TRANSACTION = {
  type: "expense",
  date: new Date().toISOString().split("T")[0],
  account: "BCA",
  category: "Food",
  note: "",
  amount: 0,
};