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
        <div class="pizza-container" onclick="addpizza(${i}); updateCheckout();">
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

function addpizza(indice)
{
    // method to trim non-numbers found online
    var price = document.getElementsByClassName("pizza-price")[indice].innerHTML.replace(/\D/g,'');
    var amount = document.getElementById("pizza" + indice + "-amount");
    var total = document.getElementById("pizza" + indice +"-total");

    if(amount != null)
    {
        var tempAmount = parseInt(amount.innerHTML.replace(/\D/g,''), 10);
        /*  it's important to clear the non-numbers each time as "amount: 1" isn't parsable as a number
        also intuitively, building strings is performance heavy so there is in theory a better way to do this but rn idc */
        tempAmount += 1;
        amount.innerHTML = `Amount: ${tempAmount}`;
        total.innerHTML = `Total: ${tempAmount * price} kr.`;
        return;
        // early return my beloved
    }
    console.log("hi")
    itemdiv.innerHTML += `
    <div class="item" id="pizza${indice}">
        <p>${document.getElementsByClassName("pizza-name")[indice].innerText}</p>
        <p id="pizza${indice}-amount">Amount: 1</p>
        <p>price: ${price} kr.</p> 
        <p id="pizza${indice}-total">Total: ${price * 1} kr.</p>
    </div>
    `;
}

function updateCheckout()
{
    let pizzaAmount = document.getElementsByClassName("item");
    let totalprice = document.getElementById("total-price");
    var total = 0;

    for (let i = 0; i < pizzaAmount.length; i++)
    {
        console.log("a");
        total += parseInt(document.getElementById("pizza" + i +"-total").innerHTML.replace(/\D/g,''), 10);
    }
    
    totalprice.innerHTML = `check out: ${total} kr.`;
}


