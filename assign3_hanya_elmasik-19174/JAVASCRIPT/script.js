const appetizersData = [
  {
    id: 101,
    name: "Caprese Skewers",
    description: "Colorful skewers with an easy balsamic reduction for a pop of sweet and tangy flavor.",
    price: 4.99,
    image: "../Images/caprese-skewers.jpg"
  },
  {
    id: 102,
    name: "Best Bean Dip",
    description: "Cheesy dip with fresh toppings like avocado, cherry tomatoes, and jalapeños.",
    price: 10.99,
    image: "../Images/bean-dip.jpg"
  },
  {
    id: 103,
    name: "Avocado Salsa",
    description: "Creamy, sweet, spicy, and bright.",
    price: 10.99,
    image: "../Images/avocado-salsa.jpg"
  }
];

const mainData = [
  {
    id: 201,
    name: "Pizza",
    description: "Bread, jalapeños, sauces.",
    price: 14.99,
    image: "../Images/pizza.jpg"
  },
  {
    id: 202,
    name: "Burger",
    description: "Grilled chicken burger with sauces.",
    price: 4.99,
    image: "../Images/burger.jpg"
  },
  {
    id: 203,
    name: "Pasta",
    description: "Chicken, sauce, black pepper.",
    price: 4.99,
    image: "../Images/pasta.jpg"
  },
  {
    id: 204,
    name: "Margarita",
    description: "1 wedge lime · 1 teaspoon coarse sea salt.",
    price: 2.59,
    image: "../Images/margarita.jpg"
  },
  {
    id: 205,
    name: "Sandwich",
    description: "Brown bread with chicken and sauces.",
    price: 4.99,
    image: "../Images/sandwich.jpg"
  },
  {
    id: 206,
    name: "Hot Dog",
    description: "Beef, cherry powder, paprika and sauces.",
    price: 4.99,
    image: "../Images/hot-dog.jpg"
  }
];

const dessertsData = [
  {
    id: 301,
    name: "Whipped Cream",
    description: "Cream, strawberry, rolled bread.",
    price: 10.99,
    image: "../Images/whipped-cream.jpg"
  },
  {
    id: 302,
    name: "Cup Cake",
    description: "Cream, bread, red velvet.",
    price: 3.99,
    image: "../Images/cup-cake.jpg"
  },
  {
    id: 303,
    name: "Brownie",
    description: "Lava chocolate, chocolate chip.",
    price: 2.50,
    image: "../Images/brownie.jpg"
  },
  {
    id: 304,
    name: "Sponge Cake",
    description: "Cream, strawberry, rolled bread.",
    price: 13.99,
    image: "../Images/sponge-cake.jpg"
  },
  {
    id: 305,
    name: "Coconut Slice",
    description: "Coconut, cake, chocolate.",
    price: 8.99,
    image: "../Images/coconut-slice.jpeg"
  }
];


const cartItems = [];
let totalPrice = 0;

function createCard(item) {
  return `
    <div class="card">
      <img src="${item.image}">
      <div>
        <div>
          <h4 class="item-name">${item.name}</h4>
          <p>${item.description}</p>
        </div>
        <div>
          <span>$${item.price}</span>
          <button class="add-to-cart" data-item-id="${item.id}">ADD TO CART</button> <!-- changed data-item-id to item.id -->
        </div>
      </div>
    </div>
  `;
}

function displayItems(items, container) {
  const itemsDiv = document.querySelector(container);
  items.forEach(item => {
    itemsDiv.innerHTML += createCard(item);
  });
}


function addToCart(itemId) {
  const selectedItem = [...appetizersData, ...mainData, ...dessertsData].find(item => item.id === itemId);
  if (selectedItem) {
    cartItems.push(selectedItem);
    totalPrice += parseFloat(selectedItem.price);
    displayCart();
  }
}


function displayCart() {
  const cartContainer = document.getElementById('cart');
  const cartPriceElement = document.getElementById('cart-price');
  const orderElement = document.getElementById('order');
  cartContainer.innerHTML = '';
  cartItems.forEach(item => {
    cartContainer.innerHTML += `
      <div class="cart-item">
          <h4 class="item-name">${item.name}</h4>
          <span>${item.price}</span>
      </div>
    `;
  });
  cartPriceElement.innerHTML = `
  <div class="total-price">
    <hr>
    Total Bill: $${totalPrice.toFixed(2)}
  </div>
  `;


  if (totalPrice > 0) {
    orderElement.innerHTML = `
      <button id="place-order">Place Order</button>
      <button id="cancel-order">Cancel Order</button>
    `;
  } else {
    orderElement.innerHTML = `<h3>Add Items to place order!</h3>`;
  }
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    const itemId = parseInt(event.target.dataset.itemId);
    addToCart(itemId);
  } else if (event.target.id === 'place-order') {
    cartItems.length = 0;
    totalPrice = 0;
    displayCart();
    window.alert("Order placed successfully!");
  } else if (event.target.id === 'cancel-order') {
    const confirmed = window.confirm("Are you sure you want to cancel the order?");
    if (confirmed) {
      cartItems.length = 0;
      totalPrice = 0;
      displayCart();
    }
  }
});

displayItems(appetizersData, '.appetizer-items-div');

displayItems(mainData, '.main-items-div');

displayItems(dessertsData, '.desserts-items-div');
