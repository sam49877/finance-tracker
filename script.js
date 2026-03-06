const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec";

function selectButton(button,type){

let buttons = button.parentElement.querySelectorAll("button")

buttons.forEach(btn=>{
btn.classList.remove("active")
})

button.classList.add("active")

document.getElementById(type).value = button.innerText

}

function generateTxnId(){

return Math.floor(Math.random()*100000)

}

function submitData(){

let data = {

id:generateTxnId(),
date:document.getElementById("date").value,
month:document.getElementById("month").value,
type:"Expense",
category:document.getElementById("category").value,
subcategory:document.getElementById("subcategory").value,
description:document.getElementById("description").value,
merchant:document.getElementById("merchant").value,
paymentmode:document.getElementById("paymentmode").value,
source:document.getElementById("source").value,
frequency:document.getElementById("frequency").value,
fixedvariable:document.getElementById("fixedvariable").value,
needwant:document.getElementById("needwant").value,
amount:document.getElementById("amount").value,
tags:document.getElementById("tags").value

}

fetch(scriptURL,{
method:"POST",
body:JSON.stringify(data)
})
.then(response => alert("Entry Added Successfully"))
.catch(error => alert("Error adding entry"))

}