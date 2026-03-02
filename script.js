const form = document.getElementById("financeForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");


const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec"; // paste your /exec link here
// Auto-set today's date

// Auto date
document.getElementById("date").valueAsDate = new Date();

// Toggle Logic (Universal)
const toggleGroups = document.querySelectorAll(".toggle-group");

toggleGroups.forEach(group => {
  const targetInput = document.getElementById(group.dataset.target);
  const buttons = group.querySelectorAll(".toggle-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      targetInput.value = button.dataset.value;
    });
  });
});

// Reset on load (fix PC glitch)
window.addEventListener("load", () => {
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.classList.remove("active");
  });
});

// Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const requiredFields = ["type", "paymentMode"];
  for (let field of requiredFields) {
    if (!document.getElementById(field).value) {
      message.innerText = "Please complete all required selections.";
      message.style.color = "red";
      return;
    }
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
    paymentMode: document.getElementById("paymentMode").value,
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
      document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.classList.remove("active");
      });
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