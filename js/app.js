const form = document.getElementById("expenseForm");
const transactionList = document.getElementById("transactions");
const balanceElement = document.getElementById("balance");
const totalElement = document.getElementById("totalAmount");
const spentElement = document.getElementById("spendings");
const categoryFilter = document.getElementById("categoryFilter");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const updateLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const updateSummary = () => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalElement.textContent = `$${total.toFixed(2)}`;

  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  spentElement.innerHTML = Object.entries(categories)
    .map(
      ([category, amount]) => `
      <div class="summary__item">
        <h4 class="summary__name">${
          category.charAt(0).toUpperCase() + category.slice(1)
        }</h4>
        <span class="summary__amount">$${amount.toFixed(2)}</span>
      </div>`
    )
    .join("");
};

const updateBalance = () => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  balanceElement.textContent = `$${total.toFixed(2)}`;
};

const renderTransactions = (filterCategory = "all") => {
  const filteredExpenses =
    filterCategory === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === filterCategory);

  transactionList.innerHTML = filteredExpenses
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

  transactionList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(
        e.target.closest(".transaction__item").dataset.id,
        10
      );
      expenses = expenses.filter((expense) => expense.id !== id);
      updateLocalStorage();
      renderTransactions(filterCategory);
      updateBalance();
      updateSummary();
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense = {
    id: Date.now(),
    name: form.name.value,
    amount: parseFloat(form.amount.value),
    category: form.category.value,
    date: form.date.value,
  };

  expenses.push(expense);
  updateLocalStorage();
  renderTransactions();
  updateBalance();
  updateSummary();
  form.reset();
});

categoryFilter.addEventListener("change", (e) => {
  renderTransactions(e.target.value);
});

// Initial setup
updateSummary();
updateBalance();
renderTransactions();
