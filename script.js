const PizzaData = { 
    "pizzas" : [
        {
            "name" : "Margarita",
            "price" : 7000,
            "toppings" : ["Tomato", "Cheese"],
            "images" : {
                "small_image" : "images/margherita_small.jpg",
                "big_image" : "images/margherita_big.jpg"
            }
        },
        {
            "name" : "Pepperoni",
            "price" : 7999,
            "toppings" : ["Tomato, Cheese, Pepperoni"],
            "images" : {
                "small_image" : "images/pepperoni_small.jpg",
                "big_image" : "images/pepperoni_big.jpg"
            }
        }
    ]
};




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
for (let i = 0; i < PizzaData.pizzas.length; i++)
{
    pizzadiv.innerHTML += createPizza(PizzaData.pizzas[i])
}

