let ShoppingCart = document.getElementById("cartTotal");
// let label = document.getElementById("label");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */

// let calculation = () => {
//   let cartIcon = document.getElementById("cartAmount");
//   cartIcon.textContent = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
// };

// calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

 

let generateCartItems = () => {
    
        return (ShoppingCart.innerHTML = basket
        .map((x) => {
        
            let amountTotal = basket
                .map(() => {
                let { id, item} = x;
                let filterData = shopItemsData.find(() => x.id === id);
                return filterData.price + 5000;
                
                });
 

            let amount = basket
            .map(() => {
                let { id, item} = x;
                let filterData = shopItemsData.find((x) => x.id === id);
                return filterData.price  ;
                
            });
      
      
            return `
            
            <h3 class="billing-heading mb-4">Cart Total</h3>
            <p class="d-flex">
            <span>Subtotal</span>
            <span>${amount}Fc</span>
            </p>
            <p class="d-flex">
            <span>Delivery</span>
            <span>5000Fc</span>
            </p>
        
            <hr>
            <p class="d-flex total-price">
                <span>Total</span>
                <span>${amountTotal}</span>
            </p>
        
        
                
            `
        ;
        })
        .join(""));
        
  
};

generateCartItems();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
//   calculation();
  //TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
//   calculation();
  generateCartItems();
  //TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

// let TotalAmount = () => {
//   if (basket.length !== 0) {
//     let amount = basket
//       .map((x) => {
//         let { id, item } = x;
//         let filterData = shopItemsData.find((x) => x.id === id);
//         return filterData.price * item + 2000;
//       })
//       .reduce((x, y) => x + y, 0);

//     return (label.innerHTML = `
//     <h2> PRIX TOTAL DE LA COMMANDE : ${amount} Fc<h2>
//     `);
//   } else return;
// };

// TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

let clearCart = () => {
  basket = [];
  generateCartItems();
//   calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  
  
};










$(document).ready(function (){
    
})