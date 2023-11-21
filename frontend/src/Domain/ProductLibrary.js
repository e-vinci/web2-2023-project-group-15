/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import Navigate from "../Components/Router/Navigate";



class ProductLibrary{
    
    async createOrder(){
        let  allProducts='';
        try {
            const reponse = await fetch(`/api/products/`);
            console.log("résultat reponse " , reponse)
      
            if (!reponse.ok) {
              throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
            }
            allProducts =  reponse.json();
          } catch (err) {
            console.error('error: ', err);
          }
          Navigate('/');
          return allProducts;
    }
}
export default ProductLibrary;