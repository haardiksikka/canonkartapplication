const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/shopping.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const Vendor = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

const Product = db.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
  })

  Vendor.hasMany(Product, {onDelete: 'cascade'})
  Product.belongsTo(Vendor, {onDelete: 'cascade'})
  
  
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    
  })
  const Cart = db.define('cart', {
   
    price:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity:{
      type:Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0
    }
    
  })

  Product.hasMany(Cart, {onDelete: 'cascade'})
  Cart.belongsTo(Product, {onDelete: 'cascade'})
  
  User.hasMany(Cart)
  Cart.belongsTo(User)
  
module.exports = {
  db, 
  Product,
  User,
  Vendor,
  Cart

}
