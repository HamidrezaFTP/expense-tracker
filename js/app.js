const form = document.getElementById("expenseForm");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const expense = {
    id: Date.now(), // Unique ID based on the current timestamp
    name: form.name.value,
    amount: parseFloat(form.amount.value), // Convert the amount to a number
    category: form.category.value,
    date: form.date.value,
  };

  expenses.push(expense); // Add the new expense to the array
  updateLocalStorage();
  renderTransactions();
  updateBalance();
  form.reset();
});
