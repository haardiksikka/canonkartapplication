var userdata={};

$(() => {

    
$('#logout').click(()=>{
  sessionStorage.removeItem("session")
  window.location="/";
  alert('successfully logged out!')
})
    

 refreshList();
$('#userlogin').click(() => {
      $.post(
        '/shopping',
        {
          name: $('#username').val(),
        },
        (data) => {
          if (data.success) {
              
             
             userdata.id=data.objBody[0].id
             sessionStorage.setItem("session",data.objBody[0].id)
             
             refreshList()
          } 
          else {
            
            alert('Some error occurred'+ data.err)
          }
        }
      )
})

})

function refreshList() {
  $.get(        
    '/allproducts', 
    (data) => {
    $('#productlist').empty()

   
   var items = data
         console.log(data)
    for (let product of items) {

      $('#productlist').append(
      
        `<div style="margin:10px; border:4px solid;padding:23px" class="col-sm-2" id='products'>
              Product: ${product.name}
                <br> price: ${product.price}<br> 
                 vendor: ${product.vendor.name}<br>
                <button class="btn btn-primary add-to-cart-btn" onclick="addtocart('${product.price}','${product.id}','${userdata.id}')">Add To Cart</button>

          </div>`
          
        
      )
      if(sessionStorage.getItem('session')){
        $('.add-to-cart-btn').prop('disabled',false)  
    }
    else{
      $('.add-to-cart-btn').prop('disabled',true)
    }
    
      }

  })
}

function removeFromCart(price,pid,uid){
  $.post(
    '/removeFromCart',
    {
        usrid:uid,
        prdct:pid,
        price:price,
    },
    (data)=>{
        if(data.success){
            refreshList()
          // alert('Product added to cart')
        }
        else{
            alert('Error occured!! ' + data.err)
        }
    }  
)
}
function addtocart(price,pid,uid){
    $.post(
        '/addToCart',
        {
            usrid:uid,
            prdct:pid,
            price:price,
        },
        (data)=>{
            if(data.success){
                refreshList()
              // alert('Product added to cart')
            }
            else{
                alert('Error occured!! ' + data.err)
            }
        }  
    )
}
