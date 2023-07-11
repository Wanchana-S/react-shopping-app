const cartReducer = (state, action) => {
  //กระบวนการจัดการ state ผ่าน action
  if (action.type ==="Calculate_Total") {
    const {total,amount} = state.products.reduce(
      (cartTotal,item)=>{
          const { price, quantity } = item;
          const totalprice = price * quantity //ยอดรวมสินค้าแต่ละรายการ
          cartTotal.total += totalprice //จำนวนเงินรวม
          cartTotal.amount += quantity //ปริมาณรวม
          return cartTotal
    },{
        total:0,
        amount:0
    })
    return{
      ...state,
      total,
      amount
    }
  }
  if (action.type ==="Remove"){
    return{
      ...state,
      products:state.products.filter((item)=>item.id !==action.payload)
    }
  }
  if(action.type ==="Add_qty"){
      let updateProduct = state.products.map((item)=>{
        if(item.id === action.payload){
            return {
              ...item,
              quantity:item.quantity + 1
            }
        }
        return item;
      })
      return {...state,
      products:updateProduct}
  }
  if(action.type ==="Remove_qty"){
    let updateProduct = state.products.map((item)=>{
      if(item.id === action.payload){
          return {
            ...item,
            quantity:item.quantity - 1
          }
      }
      return item;
    }).filter((item)=>item.quantity !== 0)
    return {...state,
    products:updateProduct}
}
};
export default cartReducer;
