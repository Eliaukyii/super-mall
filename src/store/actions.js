import{
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default{
    addCart(context,payload){
        // return new Promise((resolve,reject)=>{
            // 查找数组中是否有该商品
            let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
            
            //判断oldProduct是有值
            if(oldProduct){
                // oldProduct.count+=1
                context.commit(ADD_COUNTER,oldProduct)
                // resolve('当前的商品数量+1')
            }else{
                context.commit(ADD_TO_CART,payload)
                // resolve('添加了新的商品')
            }
        // }
        // )

    }
}