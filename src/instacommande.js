$(document).ready(function () {
  $('.result').hide()
})


let shop = document.getElementById("select");
let prix = document.getElementById("result");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
        
            <option  value="" style="display: none">--- Choisis Ton Produit ---</option>
            <option name="option" value="${price}">${name}</option>
            
      
        
    `;
    })
    .join(""));
};

generateShop();

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

  
  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  
  
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
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
//   calculation();
};


/**
 * ! To calculate total amount of selected Items
 */

// let calculation = () => {
//   let cartIcon = document.getElementById("cartAmount");
//   cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
// };

// calculation();

let calculatePrice = () => {
  var premier = document.getElementById('prix');
  var second = document.getElementById('livraison');
  var third = document.getElementById('total');
  var quantity = document.getElementById('quantity').value;
  let value = parseInt(document.getElementById('select').value);
  return (prix.innerHTML =  shopItemsData.map((x) => {
    let { id, name, desc, img, price } = x;
    let prix1 = value * quantity; 
    let livraison = 5000;
    let prix3 = prix1 + livraison;
    premier.value = prix1;
    second.value = livraison;
    third.value = prix3;
    $('.result').show();
    



  })
  )
};
$('#quantity').change(function() {
  calculatePrice();
})

