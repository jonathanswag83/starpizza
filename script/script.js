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
        <div class="pizza-container" onclick="addPizzaToList(${i}); updateCheckout();">
            <div class="pizza-properties">
                <p class="pizza-name">${pizza.name}</p> 
                <p class="pizza-price">fra <b><span id="pizza${i}-price">${pizza.price}</span> kr</b></p> 
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



const itemdiv = document.getElementById("selected-items");

function addPizzaToList(indice)
{
    let amount = document.getElementById("pizza" + indice + "-amount");
    let price = document.getElementById("pizza" + indice + "-price").innerHTML;
    if(amount != null)
    {
        updatePizzaInList(indice, true);
        return;
        // early return my beloved
    }
    console.log("hi")
    itemdiv.innerHTML += `
    <div class="item" id="pizza${indice}" onclick="removePizza(${indice}); updateCheckout();">
        <p>${document.getElementsByClassName("pizza-name")[indice].innerText}</p>
        <p>Amount: <span id="pizza${indice}-amount">1</span></p>
        <p>price: <span id=pizza${indice}-price>${price}</span> kr.</p> 
        <p>Total: <span id="pizza${indice}-total">${price}</span> kr.</p>
    </div>
    `;
}

function removePizza(indice)
{
    
    let singleDeletion = document.getElementById(`pizza${indice}-amount`).innerHTML
    let pizza = document.getElementById("pizza" + indice)
    
    // return (singleDeletion == 1 ? pizza.remove() : updatePizzaInList(indice, false))
    // shorthand of below, learning how ternary operators work. it works and its fancy but i think its too hard to read
    if (singleDeletion == 1)
    {
        // using == instead of === because literal check would require me to 
        // compare against string "1" and i feel == gives me more freedom
        return pizza.remove();
    }
    updatePizzaInList(indice, false);
}

function updatePizzaInList(indice, increment)
{
    console.log("updated");
    let price = document.getElementById("pizza" + indice + "-price").innerHTML;
    let amount = document.getElementById("pizza" + indice + "-amount");
    let total = document.getElementById("pizza" + indice + "-total");

    let tempAmount = parseInt(amount.innerHTML);
    /*  it's important to clear the non-numbers each time as "amount: 1" isn't parsable as a number
    also intuitively, building strings is performance heavy so there is in theory a better way to do this but rn idc */
    //EDIT: Fixed by putting amount into its own tag, in this case, span

    /*
    if (increment)
    {
        tempAmount += 1;
    }
    else
    {
        tempAmount -= 1;
    }
    */
    //shorthand of statement above

    // i tried to get amount.innerHTML and total.innerHTML to be defined as such in the start of this function and then just
    // write amount = tempAmount; and total = tempAmount * price; here, but that doesnt work for some reason, must be smth abt types
    tempAmount += (increment ? 1 : -1)
    amount.innerHTML = tempAmount;
    total.innerHTML = tempAmount * price;

}

function updateCheckout()
{
    let pizzaAmount = document.getElementsByClassName("item");
    let totalprice = document.getElementById("total-price");
    let total = 0;

    for (let i = 0; i < pizzaAmount.length; i++)
    {
        let id = pizzaAmount[i].id.match(/\d+/)[0]; //method to find number found online
        total += parseInt(document.getElementById("pizza" + id + "-total").innerHTML);
    }
    
    totalprice.innerHTML = `check out: ${total} kr.`;
}



