const form = document.getElementById("financeForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");


const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec"; // paste your /exec link here
// Auto-set today's date

// Auto-set today's date
document.getElementById("date").valueAsDate = new Date();

// Payment button logic
const paymentButtons = document.querySelectorAll(".payment-btn");
const paymentInput = document.getElementById("paymentMode");

paymentButtons.forEach(button => {
  button.addEventListener("click", () => {
    paymentButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    paymentInput.value = button.getAttribute("data-value");
  });
});

// Force reset on page load (Fix PC glitch)
window.addEventListener("load", () => {
  paymentButtons.forEach(btn => btn.classList.remove("active"));
  paymentInput.value = "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!paymentInput.value) {
    message.innerText = "Please select payment mode.";
    message.style.color = "red";
    return;
  }

  const dateValue = document.getElementById("date").value;

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
    paymentMode: paymentInput.value,
    fixedVariable: document.getElementById("fixedVariable").value,
    needWant: document.getElementById("needWant").value,
    amount: document.getElementById("amount").value,
    tags: document.getElementById("tags").value,
    source: "Manual"
  };

  try {
    submitBtn.disabled = true;
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
      paymentButtons.forEach(btn => btn.classList.remove("active"));
      paymentInput.value = "";
      document.getElementById("date").valueAsDate = new Date();
    } else {
      message.innerText = "Error adding entry.";
      message.style.color = "red";
    }

  } catch (error) {
    message.innerText = "Network error.";
    message.style.color = "red";
  }

  submitBtn.disabled = false;
});