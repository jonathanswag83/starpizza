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
    // method to trim non-numbers found online
    var price = document.getElementById("pizza" + indice + "-price").innerHTML;
    var amount = document.getElementById("pizza" + indice + "-amount");
    var total = document.getElementById("pizza" + indice +"-total");

    if(amount != null)
    {
        var tempAmount = parseInt(amount.innerHTML);
        /*  it's important to clear the non-numbers each time as "amount: 1" isn't parsable as a number
        also intuitively, building strings is performance heavy so there is in theory a better way to do this but rn idc */
        //EDIT: Fixed by putting amount into its own tag, in this case, span
        tempAmount += 1;
        amount.innerHTML = tempAmount;
        total.innerHTML = tempAmount * price;
        return;
        // early return my beloved
    }
    console.log("hi")
    itemdiv.innerHTML += `
    <div class="item" id="pizza${indice}" onclick:"updateCheckout(); onclick="removePizza(${indice});">
        <p>${document.getElementsByClassName("pizza-name")[indice].innerText}</p>
        <p>Amount: <span id="pizza${indice}-amount">1</span></p>
        <p>price: <span id=pizza${indice}-price>${price}</span> kr.</p> 
        <p>Total: <span id="pizza${indice}-total">${price}</span> kr.</p>
    </div>
    `;
}

function removePizza(indice)
{

    var price = document.getElementById("pizza" + indice + "-price").innerHTML;
    var amount = document.getElementById("pizza" + indice + "-amount");
    var total = document.getElementById("pizza" + indice +"-total");
    
    var singleDeletion = document.getElementById(`pizza${indice}-amount`)
    console.log(singleDeletion.innerHTML);
    if (singleDeletion.innerHTML == 1)
    {
        let pizza = document.getElementById("pizza" + indice)
        pizza.remove();
    }
    else
    {
        //could rework this into an "updatePizza()" function
        var tempAmount = parseInt(amount.innerHTML);
        tempAmount -= 1;
        amount.innerHTML = tempAmount;
        total.innerHTML = tempAmount * price;
    }
    updateCheckout();


}

function updateCheckout()
{
    let pizzaAmount = document.getElementsByClassName("item");
    let totalprice = document.getElementById("total-price");
    var total = 0;

    for (let i = 0; i < pizzaAmount.length; i++)
    {
        var id = pizzaAmount[i].id.replace("pizza", "").replace("-total", ""); // idk why this works
        total += parseInt(document.getElementById("pizza" + id + "-total").innerHTML);
    }
    
    totalprice.innerHTML = `check out: ${total} kr.`;
}



