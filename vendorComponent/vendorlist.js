$(() => {

    

  refreshList()

$('#addvendor').click(() => {
      $.post(
        '/vendor',
        {
          name: $('#vendorname').val(),
        },
        (data) => {
          if (data.success) {
             refreshList()
          } 
          else {
            alert('Some error occurred')
          }
        }
      )
})

})


function refreshList() {
  $.get(        
    '/vendor', 
    (data) => {
    $('#vendorlist').empty()

  
    for (let vendor of data) {
      $('#vendorlist').append(
        `<li style="margin:10px" class="list-group-item"> ${vendor.name} <button onclick="deleteVendor('${vendor.id}')">Delete</button></li>`
      )
    }
  })
}

function deleteVendor(vid){
  $.ajax({
    url: '/deleteVendor',
    type: 'DELETE',
    data: {vId: vid},
    success: function(result) {
        refreshList()
    }
});
}