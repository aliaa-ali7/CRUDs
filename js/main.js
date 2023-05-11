tName=document.getElementById('productNameInp');
tPrice=document.getElementById('productPriceInp');
tCategory=document.getElementById('productCategoryInp');
tDesc=document.getElementById('productDescInp');

let mood='create'                          
var productsContainer=[]
                 
    if(localStorage.getItem('TodayProducts') !=null){
        productsContainer= JSON.parse(localStorage.getItem('TodayProducts'))
        displayProducts()
    }
    


window.onload= function(){
    tName.focus()
}

function addProduct() {
    var product ={
        name:tName.value,
        price:tPrice.value,
        category:tCategory.value,
        desc:tDesc.value
    }
    console.log(product)
    productsContainer.push(product)
    console.log(productsContainer)

    localStorage.setItem('TodayProducts',JSON.stringify(productsContainer))

    displayProducts()
    clearForm()

}

function clearForm() {
    productNameInp.value="";
    productPriceInp.value="";
    productCategoryInp.value="";
    productDescInp.value= "";
}

function displayProducts() {
    var cartona=``
    for (let i = 0; i < productsContainer.length; i++) {
        // console.log(productsContainer[i].name)
        // console.log(productsContainer[i].price)
        // console.log(productsContainer[i].category)
        // console.log(productsContainer[i].desc)
         cartona +=`
        <tr>
              <td>${i+1}</td>
              <td>${productsContainer[i].name}</td>
              <td>${productsContainer[i].price}</td>
              <td>${productsContainer[i].category}</td>
              <td>${productsContainer[i].desc}</td>
              <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">update</button></td>
              <td><button onclick="deletProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button></td>
            </tr>
        `
        
    }
    document.getElementById('tableBody').innerHTML=cartona
}

function deletProduct(index){
    productsContainer.splice(index,1)
    localStorage.setItem('TodayProducts', JSON.stringify(productsContainer))
    displayProducts()
}

function updateProduct(index){
    productNameInp.value=productsContainer[index].name;
    productPriceInp.value=productsContainer[index].price;
    productCategoryInp.value=productsContainer[index].category;
    productDescInp.value= productsContainer[index].desc;
   
}


function search(term){
    console.log(term);
    var cartona="";

    for (let i = 0; i < productsContainer.length; i++) {
        
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            
            cartona +=`
            <tr>
                  <td>${i+1}</td>
                  <td>${productsContainer[i].name}</td>
                  <td>${productsContainer[i].price}</td>
                  <td>${productsContainer[i].category}</td>
                  <td>${productsContainer[i].desc}</td>
                  <td><button class="btn btn-outline-warning btn-sm">update</button></td>
                  <td><button onclick="deletProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button></td>
                </tr>
            `
        }
        
    }
    document.getElementById('tableBody').innerHTML=cartona
}


function validationProductNam(){
    var regx =/^[A-Z][a-zA-z]{3,6}$/

    if(regx.test(productNameInp.value)){
    return true;
    }
    else{
        return false
    }
}
