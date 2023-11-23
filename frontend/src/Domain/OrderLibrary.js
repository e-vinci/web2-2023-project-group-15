/* eslint-disable class-methods-use-this */
import { getAuthenticatedUser } from "../utils/auths";
import {getCartTotal} from "../utils/shoppingCart";
import Navigate from "../Components/Router/Navigate";

class OrderLibrary{

   
    async createOrder(e){

        e.preventDefault();
        const username = getAuthenticatedUser.username();
        const totalPrice =  getCartTotal();
        let order;
      
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                  "username": username,
                  "prixTotal": totalPrice,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              };
      
            const reponse = await fetch(`/api/orders/getAll`, options);
            console.log("résultat reponse " , reponse)
      
            if (!reponse.ok) {
              throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
            }
            order =  reponse.json();
          } catch (err) {
            console.error('error: ', err);
          }
          Navigate('/');
          return order;
    
    }

}
export default OrderLibrary;