let shop = document.getElementById("shop");

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
        <div class="col-md-6 col-lg-3 ftco-animate">
        <div id=product-id-${id} class="product ">
            <a   class="imd-prod"><img class="img-fluid" " src=${img} alt="" wi>
            <div class="overlay"></div>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3>${name}</h3>
                <div class="d-flex">
                    <div class="pricing">
                    <p> ${price} Fc
                    </p>
                    </div>
                </div>
                
                <a class="btn btn-primary" onclick="increment(${id})" >Ajouter Au Panier</a>
                
                <div id=${id} class="quantity" style="color: green";> QT : ${
                    search.item === undefined ? 0 : search.item
                }
                </div>

                <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                
                
          </div>
                        
                    
                
                
            </div>
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