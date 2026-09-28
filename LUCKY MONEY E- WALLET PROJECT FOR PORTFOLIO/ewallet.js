let balance = Number(localStorage.getItem("balance")) || 0;
let saved = Number(localStorage.getItem("saved")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

function peso(n) {
    return "₱ " + n.toFixed(2);
}

function getAmount(text) {
    let amount = parseFloat(prompt(text));
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return null;
    }
    return amount;
}

function deposit() {
    let amount = getAmount("Deposit amount:");
    if (amount === null) return;
    balance += amount;
    history.push("Deposit: +" + peso(amount));
    update();
}

function withdraw() {
    let amount = getAmount("Withdraw amount:");
    if (amount === null) return;
    if (amount > balance) return alert("Not enough balance.");
    balance -= amount;
    history.push("Withdraw: -" + peso(amount));
    update();
}

function savings() {
    let amount = getAmount("Amount to save:");
    if (amount === null) return;
    if (amount > balance) return alert("Not enough balance.");
    balance -= amount;
    saved += amount;
    history.push("Saved: " + peso(amount));
    update();
}

function update() {
    document.getElementById("headerBalance").textContent = peso(balance);
    document.getElementById("mainBalance").textContent = peso(balance);
    document.getElementById("savings").textContent = peso(saved);

    let box = document.getElementById("transactions");
    box.innerHTML = history.length
        ? history.slice(-10).reverse().map(t => "<p>" + t + "</p>").join("")
        : "<p>No transactions yet</p>";

    localStorage.setItem("balance", balance);
    localStorage.setItem("saved", saved);
    localStorage.setItem("history", JSON.stringify(history));
}

update();
