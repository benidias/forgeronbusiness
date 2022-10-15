let shop = document.getElementById("items");

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
        <div class="row" >
            <div class="col-lg-6 mb-5 ftco-animate">
                <a href=${img} class="image-popup"><img src=${img} class="img-fluid" alt="Colorlib Template"></a>
            </div>
            <div class="col-lg-6 product-details pl-md-5 ftco-animate">
                <h3>${name}</h3>
                
                <p class="price"><span>${price} Fc</span></p>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until.
                </p>
                <div class="row mt-4">
                    
                    <div class="w-100"></div>
                    
                        
                    
                    <div id=${id} class="quantity"> Dans le Panier : <h3> ${
                        search.item === undefined ? 0 : search.item
                    }</h3> 
                        
                    
                    
                    
                    </div>
                    
                    <div class="w-100"></div>
                    
                </div>
                <a class="btn btn-primary" onclick="increment(${id})" >Ajouter Article</a>
                <a class="btn btn-primary" onclick="decrement(${id})" >Retier Article</a>
                <a class="btn btn-warning" href="cart.html" >Aller au panier</a>
            </div>
        </div>











        
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
  update(selectedItem.id);
  
  
  
  
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
  calculation();
  
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();