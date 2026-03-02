
const form = document.getElementById("financeForm");
const message = document.getElementById("message");

const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec"; // paste your /exec link here
// Auto-set today's date
document.getElementById("date").valueAsDate = new Date();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dateValue = document.getElementById("date").value;

  if (!dateValue) {
    message.innerText = "Please select a date.";
    message.style.color = "red";
    return;
  }

  const monthValue = new Date(dateValue).toLocaleString('default', {
    month: 'short',
    year: 'numeric'
  });

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
    message.innerText = "Submitting...";
    message.style.color = "black";

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      message.innerText = "Entry added successfully!";
      message.style.color = "green";
      form.reset();
      document.getElementById("date").valueAsDate = new Date();
    } else {
      message.innerText = "Error adding entry.";
      message.style.color = "red";
    }

  } catch (error) {
    message.innerText = "Network error.";
    message.style.color = "red";
  }
});