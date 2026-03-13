const scriptURL = "https://script.google.com/macros/s/AKfycbwHOLnxgvZjzzucG31hKqTaqIBWXmQQGwCt5KpyORnwqajmuajCns8sW6Z3tteodT1b/exec";


async function loadCategoryChart(){

try{

let response = await fetch(scriptURL + "?action=categorySummary");

let data = await response.json();


// SORT DATA BY AMOUNT (HIGH → LOW)

data.sort((a,b)=> b.amount - a.amount);


let labels = [];
let values = [];

data.forEach(row=>{
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

indexAxis:'y',

responsive:true,

plugins:{

legend:{
display:false
},

datalabels:{
anchor:'end',
align:'right',
color:'#000',
font:{
weight:'bold'
},
formatter:function(value){
return "₹"+value;
}
}

},

scales:{
x:{
beginAtZero:true
}
}

},

plugins:[ChartDataLabels]

});

}

catch(error){

console.error("Error loading analytics:",error);

}

}

loadCategoryChart();