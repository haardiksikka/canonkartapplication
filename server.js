const express = require('express')
const {
  db,
  Vendor,
  Product,
  User,
  Cart
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
//------vendor component----------
app.use('/',
  express.static(__dirname + '/shoppingComponent')
)

app.use('/vendors',
  express.static(__dirname+'/vendorComponent')
    )
app.get('/vendor', async (req, res) => {

    const vendor = await Vendor.findAll()
   // console.log(vendor)
    res.send(vendor)
})
app.post('/vendor', async (req, res) => {

    try {
      const result = await Vendor.create({
        name: req.body.name
      })
      res.send({success: true})
    } 
    catch (e) {
      res.send({success: false, err: e.message})
    }
  
  
  })

  app.delete('/deleteVendor', async (req,res) =>{
    console.log(req.body.vId)
    // const productId= await Product.findAll({
    //   attributes: ['id'],
    //   where: {
    //     vendorId: parseInt(req.body.vId)
    //   }
    // })
    // var prdtid=[]
    // for(let pid of productId){
    //   prdtid.push(pid.id)
    // }

    //  await Product.destroy({
    //     where: {
    //       id: prdtid
    //     }
    //   })
  //  await  Cart.destroy({
  //       where:{
  //         productId:prdtid
  //       }
  //     })
     await Vendor.destroy({
        where:{
          id: parseInt(req.body.vId),
          
        }
      })
      res.send({succes: true})
  })

//---vendor component

//---product Component
app.use('/addproduct',
express.static(__dirname + '/productComponent')
)

app.get('/addproduct/productlist', async (req, res) => {

    const products = await Product.findAll({
        where: {
            vendorId: parseInt(req.query.Id)
        }
    })
  
    res.send(products)
  })

  app.post('/addproduct', async (req, res) => {

    try {
  
      const result = await Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity:req.body.quantity,
        vendorId:req.body.vendorId
      })
      res.send({success: true, postbody:result})
    } 
    catch (e) {
      res.send({success: false, err: e.message})
    }
  
  
  })

  app.delete('/deleteProduct', (req,res) =>{
    console.log(req.body.pId)
      Product.destroy({
        where: {
          id: req.body.pId
        }
      })
      // Cart.destroy({
      //   where: {
      //     id: req.body.pId
      //   }
      // })
      res.send({succes: true})
  })


//----product Component


//----Shopping Component
app.use('/shopping',
express.static(__dirname + '/ShoppingComponent')
)
app.get('/allproducts', async (req, res) => {

    const products = await Product.findAll()
  // const result= await Cart.findAll({ include: [ Product, User ] })
  

    res.send(products)
  })
app.post('/shopping', async (req, res) => {

    try {
      const user=await User.findAll({
          where: {
              name: req.body.name
          }
      })
     // console.log(user.length)
      if(user.length==0) { 
      const result = await User.create({
        name: req.body.name,
       
      })

      res.send({success: true, objBody:result})
    }
      else{

            res.send({success: true, objBody:user} )
      }
    } 
    catch (e) {
      res.send({success: false, err: e.message})
    }
  
  
  })
app.post('/removeFromCart', async (req,res)=>{
    Cart.decrement({
        quantity: 1
    },
    {
      where: {
        productId: parseInt(req.body.prdct),
        userId: parseInt(req.body.usrid)
      }
    })
    res.send({success:true})
  })
  app.post('/addToCart', async (req, res) => {
    
   try{
     const result= await Cart.findOne({
      where: {
        productId: parseInt(req.body.prdct),
        userId: parseInt(req.body.usrid)
      }
    })
    
    if(result!==null) {
      Cart.increment({
        quantity: 1
      }, {
        where: {
          productId: parseInt(req.body.prdct),
          userId: parseInt(req.body.usrid)
        }
      })
    }
    else{
       await Cart.create({
       userId: parseInt(req.body.usrid),
       productId: parseInt(req.body.prdct),
       price:parseInt(req.body.price),
       quantity:1
      })
    }
    
    res.send({success:true})
  }
  catch(e){
    res.send({success: false, err:e.message})
  }
  
  })

  
//----Shopping Component 

//---- Cart Component

app.use( '/cart', express.static(__dirname + '/cartComponent'))
app.post('/cartLogin', async (req, res) => {
  console.log(req.body.login)
    if(!Number.isInteger(parseInt(req.body.login))){      
        res.send({success:false})
    }
    else{
      const user=await User.findAll({
          where: {
                id: parseInt(req.body.login)
            }
      })
      res.send({success: true, postbody: user}) 
    }
  
})

app.get('/itemsInCart', async (req, res) => {
  const result= await Cart.findAll({
    where: { userId: parseInt(req.query.uid)},
     include: [ Product, User ] 
    })
 
    res.send(result)
  })

db.sync()
  .then(() => {
      console.log('listenin to 8980')
    app.listen(8980)
  })
