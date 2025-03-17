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


function createPizza(pizza) {
    return `
        <div class="pizza-container">
            <div class="pizza-properties">
                <p class="pizza-name">${pizza.name}</p> 
                <p class="pizza-price">fra <b>${pizza.price} kr</b></p> 
                <p class="pizza-toppings">${pizza.toppings}</p>
            </div>
            <a href="${pizza.images.big_image}" target="_blank">
                <img src="${pizza.images.big_image}" alt="${pizza.name} pizza" title="${pizza.name} pizza">
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
        pizzadiv.innerHTML += createPizza(data.pizzas[i])
    }
}

