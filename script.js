const scriptURL = "https://script.google.com/macros/s/AKfycbx9hoQWLC77KOaxO__sZu20qBjDhu-tn64ps-491p-uuqd5dmsKK2AvOWSTiCVX6xKJ/exec";


function selectButton(button,type){

let buttons = button.parentElement.querySelectorAll("button");

buttons.forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

document.getElementById(type).value = button.innerText;

}


function generateTxnId(){
return Math.floor(Math.random()*100000);
}


function submitData(){

let data = {

id:generateTxnId(),
date:document.getElementById("date").value,
type:"Expense",
category:document.getElementById("category").value,
subcategory:document.getElementById("subcategory").value,
description:document.getElementById("description").value,
merchant:document.getElementById("merchant").value,
paymentmode:document.getElementById("paymentmode").value,
frequency:document.getElementById("frequency").value,
fixedvariable:document.getElementById("fixedvariable").value,
needwant:document.getElementById("needwant").value,
amount:document.getElementById("amount").value,
tags:document.getElementById("tags").value

};


fetch(scriptURL,{
method:"POST",
body:JSON.stringify(data)
})
.then(response => {

clearForm();

})
.catch(error => {

console.log("Error adding entry");

});

}


function clearForm(){

document.getElementById("description").value="";
document.getElementById("subcategory").value="";
document.getElementById("amount").value="";
document.getElementById("tags").value="";

document.querySelectorAll(".button-group button").forEach(btn=>{
btn.classList.remove("active");
});

document.querySelectorAll("input[type=hidden]").forEach(input=>{
input.value="";
});

}