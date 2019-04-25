var cartTotal=0;
$(() => {

  

  // function cartTotal(){
  //     $('#total').empty();
  //     $('#total').append(
  //       `<li> ${cartTotal}`
  //     )
  //   }

  $('#logout').click(()=>{
    sessionStorage.removeItem("session")
    window.location='/'
    alert('successfully logged out!')
  })

      $.post(
        '/cartLogin',
        {
          // name: $('#username').val(),
          login: sessionStorage.getItem('session')

        },
        (data) => {
          if (data.success) {
             refreshList(data.postbody[0].id)
          } 
          else { 
            window.location='/'          
            alert('User not logged in')
          }
        }
      )

$('#tt').click(()=>{
  $('#total').empty();
  $('#total').append(
    `<li style="background: lightgoldenrodyellow" class="list-group-item"> Amount Payable : ${cartTotal} </li>`
  )
})

})


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
            refreshList(uid)
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
                refreshList(uid)
              // alert('Product added to cart')
            }
            else{
                alert('Error occured!! ' + data.err)
            }
        }  
    )
}
function refreshList(userid) {
  $.get(        
    '/itemsInCart',
    {
      uid:userid
    }, 
    (data) => {
    $('#productlist').empty()
  
      cartTotal=0
    for (let products of data) {

       cartTotal+=products.price*products.quantity;
      $('#productlist').append(
      //  `<div style="margin:10px; border:4px solid;padding:23px" class="col-sm-2" id='products'>Product: ${product.product.name} <br> price: ${product.product.price}<br>Quantity: ${product.quantity}</div>`
      `<div style="margin:10px; border:4px solid;padding:23px" class="col-sm-2" id='products'>
            Product: ${products.product.name}
              <br> price: ${products.price}<br> 
              <button id='${products.pid}' class="btn btn-primary"  onclick="addtocart('${products.price}','${products.product.id}','${products.user.id}')">+</button>
                   <span>${products.quantity}</span>
              <button class="btn btn-primary delete-button"  onclick="removeFromCart('${products.price}','${products.product.id}','${products.user.id}')">-</button>
        </div>`
      )
      
      if(products.quantity<=products.product.quantity){
        $(`#${products.pid}`).attr('disabled',false)
      }
      else{
        $(`#${products.pid}`).attr('disabled',true)
      }
    }
  })
}