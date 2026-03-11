const scriptURL = "https://script.google.com/macros/s/AKfycbwHOLnxgvZjzzucG31hKqTaqIBWXmQQGwCt5KpyORnwqajmuajCns8sW6Z3tteodT1b/exec";

async function loadCategoryChart(){

try{

let response = await fetch(scriptURL + "?action=categorySummary");

let data = await response.json();

let labels = [];
let values = [];

data.forEach(row => {
labels.push(row.category);
values.push(row.amount);
});

const ctx = document.getElementById('categoryChart').getContext('2d');

new Chart(ctx,{
type:'bar',
data:{
labels:labels,
datasets:[{
label:'Spend by Category',
data:values,
borderWidth:1
}]
},
options:{
responsive:true,
plugins:{
legend:{display:false}
},
scales:{
y:{
beginAtZero:true
}
}
}
});

}

catch(error){
console.error("Error loading chart:", error);
}

}

loadCategoryChart();