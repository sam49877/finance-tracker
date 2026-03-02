const form = document.getElementById("financeForm");
const message = document.getElementById("message");

// 🔴 REPLACE THIS WITH YOUR APPS SCRIPT URL
const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dateValue = document.getElementById("date").value;
  const monthValue = new Date(dateValue).toLocaleString('default', { month: 'short', year: 'numeric' });

  const data = {
    date: dateValue,
    month: monthValue,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    subCategory: document.getElementById("subCategory").value,
    description: document.getElementById("description").value,
    paymentMode: document.getElementById("paymentMode").value,
    fixedVariable: document.getElementById("fixedVariable").value,
    needWant: document.getElementById("needWant").value,
    amount: document.getElementById("amount").value,
    tags: document.getElementById("tags").value,
    source: "Manual"
  };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      message.innerText = "Entry added successfully!";
      message.style.color = "green";
      form.reset();
    } else {
      throw new Error(result.message);
    }

  } catch (error) {
    message.innerText = "Error adding entry.";
    message.style.color = "red";
  }
});