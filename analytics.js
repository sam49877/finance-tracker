const scriptURL = "https://script.google.com/macros/s/AKfycbwHOLnxgvZjzzucG31hKqTaqIBWXmQQGwCt5KpyORnwqajmuajCns8sW6Z3tteodT1b/exec";


async function loadCategoryChart(){

try{

let response = await fetch(scriptURL + "?action=categorySummary");

let data = await response.json();


// SORT DATA (HIGH → LOW)

data.sort((a,b)=> b.amount - a.amount);


let labels = [];
let values = [];

data.forEach(row=>{
labels.push(row.category);
values.push(row.amount);
});


// DYNAMIC HEIGHT BASED ON CATEGORY COUNT

let chartHeight = labels.length * 60;

document.querySelector(".chart-container").style.height = chartHeight + "px";


const ctx = document.getElementById('categoryChart').getContext('2d');

new Chart(ctx,{

type:'bar',

data:{
labels:labels,
datasets:[{
label:'Spend by Category',
data:values,
borderWidth:1,
barThickness:28
}]
},

options:{

indexAxis:'y',

responsive:true,
maintainAspectRatio:false,

layout:{
padding:{
left:10,
right:40,
top:20,
bottom:10
}
},

plugins:{

legend:{
display:false
},

datalabels:{
anchor:'end',
align:'right',
color:'#000',
font:{
weight:'bold',
size:12
},
formatter:(value)=>"₹"+value
}

},

scales:{

x:{
beginAtZero:true,
grid:{
display:true
}
},

y:{
ticks:{
font:{
size:13
}
}
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