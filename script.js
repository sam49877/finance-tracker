const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec";



let category = "";
let paymentMode = "";
let needWant = "";


/* CATEGORY */

document.querySelectorAll(".category-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".category-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");

category = this.dataset.value;

});

});


/* PAYMENT MODE */

document.querySelectorAll(".payment-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".payment-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");

paymentMode = this.dataset.value;

});

});


/* NEED WANT */

document.querySelectorAll(".need-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".need-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");

needWant = this.dataset.value;

});

});


/* SUBMIT */

document.getElementById("expenseForm").addEventListener("submit", async function(e){

e.preventDefault();

const data = {

date: document.getElementById("date").value,
category: category,
subcategory: document.getElementById("subcategory").value,
description: document.getElementById("description").value,
paymentMode: paymentMode,
frequency: document.getElementById("frequency").value,
merchant: document.getElementById("merchant").value,
needWant: needWant,
amount: document.getElementById("amount").value,
tags: document.getElementById("tags").value

};

try{

await fetch(scriptURL,{
method:"POST",
body: JSON.stringify(data)
});

document.getElementById("expenseForm").reset();


/* RESET BUTTON STATES */

document.querySelectorAll(".toggle-btn").forEach(btn=>{
btn.classList.remove("active");
});

category="";
paymentMode="";
needWant="";

}
catch(error){

console.error("Error:",error);

}

});

document.querySelectorAll(".category-btn").forEach(btn => {

btn.addEventListener("click", function(){

document.querySelectorAll(".category-btn").forEach(b=>b.classList.remove("active"));

this.classList.add("active");

category = this.dataset.value;


/* AUTO SCROLL TO SELECTED BUTTON */

this.scrollIntoView({
behavior:"smooth",
inline:"center",
block:"nearest"
});

});

});