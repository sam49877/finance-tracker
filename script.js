const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec";


const monthlyURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec"; 
let category = "";
let subcategory = "";
let paymentMode = "";
let needWant = "";

/* CATEGORY MAP */

const categoryMap = {

Food: ["Home Food", "Outside Food", "Beverages", "Snacks"],
Travel: ["Bus", "Auto", "Train"],
Bills: ["Electricity", "Internet"],
Recharge: ["Self", "Family"],
Health: ["Medicine", "Doctor", "Tests"],
Misc: ["Pet", "Tea Break", "Other"]

};

/* AUTO DATE */

const dateInput = document.getElementById("date");
if(!dateInput.value){
dateInput.valueAsDate = new Date();
}

/* LOAD LAST MEMORY */

window.onload = function(){

const saved = JSON.parse(localStorage.getItem("lastEntry"));

if(saved){

category = saved.category || "";
paymentMode = saved.paymentMode || "UPI";
needWant = saved.needWant || "";

/* Restore selections visually */
document.querySelectorAll(".category-btn").forEach(btn=>{
if(btn.dataset.value === category){
btn.classList.add("active");
handleSubcategoryUI(category);
}
});

document.querySelectorAll(".payment-btn").forEach(btn=>{
if(btn.dataset.value === paymentMode){
btn.classList.add("active");
}
});

document.querySelectorAll(".need-btn").forEach(btn=>{
if(btn.dataset.value === needWant){
btn.classList.add("active");
}
});

}

loadMonthlyTotal();

};

/* CATEGORY CLICK */

document.querySelectorAll(".category-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".category-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");
category = this.dataset.value;

handleSubcategoryUI(category);

});

});

/* SUBCATEGORY UI */

function handleSubcategoryUI(selectedCategory){

const container = document.getElementById("subcategoryContainer");
const input = document.getElementById("subcategoryInput");

container.innerHTML = "";
subcategory = "";

if(selectedCategory === "Groceries"){

container.style.display = "none";
input.style.display = "block";

}else{

container.style.display = "flex";
input.style.display = "none";

categoryMap[selectedCategory].forEach(item => {

let btn = document.createElement("button");

btn.type = "button";
btn.innerText = item;
btn.className = "toggle-btn subcategory-btn";
btn.dataset.value = item;

btn.addEventListener("click", function(){

document.querySelectorAll(".subcategory-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");
subcategory = this.dataset.value;

});

container.appendChild(btn);

});

}

}

/* PAYMENT */

document.querySelectorAll(".payment-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".payment-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");
paymentMode = this.dataset.value;

});

});

/* NEED/WANT */

document.querySelectorAll(".need-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".need-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");
needWant = this.dataset.value;

});

});

/* QUICK AMOUNT */

document.querySelectorAll(".amount-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.getElementById("amount").value = this.innerText;

});

});

/* MONTHLY TOTAL */

async function loadMonthlyTotal(){

try{
const res = await fetch(monthlyURL);
const data = await res.json();

document.getElementById("monthlyTotal").innerText =
"This Month: ₹ " + data.total;

}catch{
document.getElementById("monthlyTotal").innerText =
"This Month: --";
}

}

/* SUBMIT */

document.getElementById("expenseForm").addEventListener("submit", async function(e){

e.preventDefault();

const subcategoryValue = category === "Groceries"
? document.getElementById("subcategoryInput").value
: subcategory;

const data = {

date: dateInput.value,
category,
subcategory: subcategoryValue,
description: document.getElementById("description").value,
paymentMode,
frequency: document.getElementById("frequency").value,
merchant: document.getElementById("merchant").value,
needWant,
amount: document.getElementById("amount").value,
tags: document.getElementById("tags").value

};

await fetch(scriptURL,{
method:"POST",
body: JSON.stringify(data)
});

/* SAVE MEMORY */

localStorage.setItem("lastEntry", JSON.stringify({
category,
paymentMode,
needWant
}));

document.getElementById("expenseForm").reset();

dateInput.valueAsDate = new Date();

document.querySelectorAll(".toggle-btn").forEach(btn=>{
btn.classList.remove("active");
});

document.getElementById("subcategoryContainer").innerHTML = "";
document.getElementById("subcategoryInput").style.display = "none";

});