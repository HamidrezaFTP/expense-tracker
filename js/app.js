const form = document.getElementById("expenseForm");
const transactionList = document.getElementById("transactions");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const renderTransactions = () => {
  transactionList.innerHTML = expenses
    .map(
      (expense) => `
    <div class="transaction__item" data-id="${expense.id}">
      <div class="transaction__details">
        <h4 class="transaction__name">${expense.name}</h4>
        <small class="transaction__meta">${expense.date} • ${
        expense.category
      }</small>
      </div>
      <div class="transaction__info">
          <span class="transaction__amount">$${expense.amount.toFixed(2)}</span>
          <button class="delete-btn transaction__delete">×</button>
        </div>
    </div>`
    )
    .join("");

  // Add event listeners to delete buttons
  transactionList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const transactionItem = e.target.closest(".transaction__item");
      const id = parseInt(transactionItem.dataset.id, 10);
      expenses = expenses.filter((expense) => expense.id !== id);
      renderTransactions(); // Re-render the transactions
    }
  });
};

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
  // updateLocalStorage();
  renderTransactions();
  // updateBalance();
  form.reset();
});
