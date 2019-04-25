$(() => {

  
  $.get(        
        '/vendor', 
        (data) => {
        // $('#vendorname').empty()
  
      
        for (let vendor of data) {
          $('#vendorname').append(
            `<option value='${vendor.id}'> ${vendor.name}</option>`

          )
        }
      })
  
     
  
    
  
    refreshList()

$('#addproduct').click(() => {
      $.post(
        '/addproduct',        
        {
          name: $('#productname').val(),
          price: $('#productprice').val(),
          quantity: $('#productquantity').val(),
          vendorId: $('#vendorname').val(),
        },
        (data) => {
          if (data.success) {
             refreshList($('#vendorname').val())
          } 
          else {
            alert('Some error occurred')
          }
        }
      )
})



})
function refreshList(vendorId) {
  //  console.log('-----------------'+vendorId+'--------------------------')
      $.get(        
        '/addproduct/productlist', 
        {
          Id:vendorId
        },
        (data) => {
         $('#productlist').empty()
  
          console.log(data)
        for (let product of data) {
            console.log(product)
          $('#productlist').append(
           
            `<div class="col-sm-2" style="margin:10px; border:4px solid;padding:23px" class="list-group-item"> ${product.name} <br> <button onclick="deleteProduct('${product.id}')">Delete</button></div>`
          )
        }
      })
    }

function deleteProduct(pid){
  $.ajax({
    url: '/deleteProduct',
    type: 'DELETE',
    data: {pId: pid},
    success: function(result) {
        refreshList($('#vendorname').val())
    }
});
}

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
                 quantity: ${product.quantity} <br>
                 vendor : ${product.vendor.name}<br>
          </div>`
          
        
      )

    
      }

  })
}