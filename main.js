// გამოვაცხადეთ პროდუტქის გლობალური მასივი
let productsArr = [];
// გამოვაცხადეთ სორტირების გლობალური ცვლადი დეფოლტ მნიშვნელობით ფასზე
let sortType = 'price'
// ფეიჯის ინიციალიზაციის ფუნქცია
const initialPage = async () => {
    //პროდუქტების წამოღება
    await fetchProducts();
    //თავდაპირველად ფასით დალაგება
    productsArr.sort(sortByAscPrice);
    //დარენდერება
    await renderProducts(productsArr)
}
//პროდუქტების წამოღების ფუნქცია
const fetchProducts = async () => {
    const PRODUCTS_URL = `https://dummyjson.com/products`;
    await fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then((responseJson) => {
            productsArr = responseJson.products
        });
};
const renderProducts = async (products) => {
    const productsGrid = document.querySelector('#products-grid');
    productsGrid.innerHTML = "";
    products.forEach((element) => {
        productsGrid.appendChild(
            createProdcutCard({
                id: element.id,
                title: element.title,
                price: element.price,
                description: element.description,
                thumbnail: element.thumbnail
            }))

    })
}

const createProdcutCard = ({id, title, price, description, thumbnail}) => {
    const productDiv = document.createElement('div');
    productDiv.id = `product-${id}`;
    productDiv.className = 'col';

    const delbtn = document.createElement('button');
    delbtn.className = 'btn btn-danger';
    delbtn.innerText = 'Delete';
    delbtn.addEventListener('click',  () => deleteProduct(id))

    const editbtn = document.createElement('button');
    editbtn.className = 'btn btn-primary';
    editbtn.innerText = 'Edit';
    editbtn.addEventListener('click', () => console.log(id));
    console.log(editbtn)


    productDiv.innerHTML = (
        `<div class="bg-dark text-white mx-auto rounded shadow d-flex flex-column justify-content-between p-3" style="height: 500px">
        <div>
            <h4>${title}</h4>
            <span>${price}$</span>
            <p style="min-height: 100px">${description}</p>
            <div style="position: relative; width: 100%; height: 200px;">
                <img src="${thumbnail}" style="width:100%; height: 100%; object-fit: cover;" alt="image">
            </div>
        </div>
        <div class="d-flex justify-content-between" id="buttons-conatiner-${id}">
        </div>
    </div>`);
    // შექმნილი პროდუქტის ქარდიდან ვიღებთ ღილაკების ჩასასმელ კონტეინერს(დივს) და შიგნით ვსვამთ ედიტის და წაშლის ღილაკს
    const btnsDiv = productDiv.querySelector(`#buttons-conatiner-${id}`)
    btnsDiv.appendChild(editbtn);
    btnsDiv.appendChild(delbtn);

    return productDiv;
};

const createProduct = () => {
    const title = document.querySelector('#pc-name-field');
    const price = document.querySelector('#pc-price-field');

    const product = {
        title: title.value,
        price: parseInt(price.value),
        description: 'Default Description',
        thumbnail: 'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500-300x300.jpg',
        id: productsArr.length + 1
    };

    productsArr.push(product);

    title.value = ''
    price.value = ''
};
const addNewProduct = (event) => {
    event.preventDefault()
    createProduct()
    sortProducts()
    renderProducts(productsArr);
};


const deleteProduct = id => {
    const index = productsArr.findIndex((product) => product.id === id);
    document.querySelector(`#product-${id}`).remove();
    productsArr.splice(index, 1)

};


function onChangeSort(event) {
    sortType = event.target.value
    sortProducts()
    renderProducts(productsArr)
}

function sortProducts() {
    if (sortType === 'price') {
        productsArr.sort(sortByAscPrice)
    }
    if (sortType === 'letter') {
        productsArr.sort(sortByAscFirstLetter)
    }
}

function sortByAscFirstLetter(a, b) {
    {
        const firstLetterA = a.title[0].toUpperCase();
        const firstLetterB = b.title[0].toUpperCase();

        if (firstLetterA < firstLetterB) {
            return -1;
        } else if (firstLetterA > firstLetterB) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortByAscPrice(a, b) {
    return a.price - b.price
}
function searchByTitle(event) {
    renderProducts(productsArr.filter(word => {
       return  word.title.toUpperCase().includes(event.target.value.toUpperCase())
    }))
}
initialPage();