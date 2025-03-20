function fetchData()
{
    fetch('data/starpizzafiles.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Http error" + response.status)
        }
        return response.json();
    })
    .then(data => createPizzas(data))
    .catch(error => console.error("failed to fetch data", error))
}
fetchData();



function createPizza(pizza, i) {
    return `
        <div class="pizza-container" onclick="addpizza(${i})">
            <div class="pizza-properties">
                <p class="pizza-name">${pizza.name}</p> 
                <p class="pizza-price">fra <b>${pizza.price} kr</b></p> 
                <p class="pizza-toppings">${pizza.toppings}</p>
            </div>
            <a href="${pizza.images.big_image}" target="_blank">
                <img src="${pizza.images.small_image}" alt="${pizza.name} pizza" title="${pizza.name} pizza">
            </a>
        </div>
        `;
}

const pizzadiv = document.getElementById("pizzas");

function createPizzas(data)
{
    console.log("wtf!!")
    for (let i = 0; i < data.pizzas.length; i++)
    {
        pizzadiv.innerHTML += createPizza(data.pizzas[i], i)
    }
}

const itemdiv = document.getElementById("selected-items")

var counter = [];

function addpizza(indice)
{
    var amount = document.getElementById("pizza" + indice + "-amount")
    if(amount != null)
    {
        amount.innerHTML = parseInt(amount.innerHTML, 10) + 1;
        return;
    }
    console.log("hi")
    itemdiv.innerHTML += `
    <div class="item" id="pizza${indice}">
        <p>${document.getElementsByClassName("pizza-name")[indice].innerText}</p>
        <p id="pizza${indice}-amount">1</p>
        <p>price: ${document.getElementsByClassName("pizza-price")[indice].innerText.replace(/\D/g,'')}</p> 
    </div>
    `;
    // method to trim non-numbers found online
}


