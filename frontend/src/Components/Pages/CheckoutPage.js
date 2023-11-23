/* eslint-disable no-unused-vars */
import { getAuthenticatedUser } from "../../utils/auths";
// import { getCartTotal } from "../../utils/shoppingCart";
 import Navigate from "../Router/Navigate";


const CheckoutPage = () => {
    const user = getAuthenticatedUser();

    if(user === undefined){
      Navigate('/login');
    }

    const html = `
    <section class="h-100 h-custom" style="background-color: #d2c9ff;">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12">
            <div class="card card-registration card-registration-2" style="border-radius: 15px;">
              <div class="card-body p-0">
                <div class="row g-0">
                  <div class="col-lg-8">
                    <div class="p-5">
                      <h4 class="mb-3">Billing address</h4>
                      <form class="needs-validation" novalidate>
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" value="${user.username}" required>
                            <div class="invalid-feedback">
                              Valid first name is required.
                            </div>
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="lastName">Last name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                            <div class="invalid-feedback">
                              Valid last name is required.
                            </div>
                          </div>
                        </div>

                        <div class="mb-3">
                          <label for="username">Username</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">@</span>
                            </div>
                            <input type="text" class="form-control" id="username" placeholder="Username" required>
                            <div class="invalid-feedback" style="width: 100%;">
                              Your username is required.
                            </div>
                          </div>
                        </div>

                        <div class="mb-3">
                          <label for="email">Email <span class="text-muted">(Optional)</span></label>
                          <input type="email" class="form-control" id="email" placeholder="you@example.com">
                          <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                          </div>
                        </div>

                        <!-- ... (autres champs du formulaire) ... -->

                        <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
                        <div class="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>
                  
                      <div class="mb-3">
                        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
                      </div>
                  
                      <div class="row">
                        <div class="col-md-5 mb-3">
                          <label for="country">Country</label>
                          <select class="custom-select d-block w-100" id="country" required>
                            <option value="">Choose...</option>
                            <option>United States</option>
                          </select>
                          <div class="invalid-feedback">
                            Please select a valid country.
                          </div>
                        </div>

                        <div class="col-md-4 mb-3">
                          <label for="state">State</label>
                          <select class="custom-select d-block w-100" id="state" required>
                            <option value="">Choose...</option>
                            <option>California</option>
                          </select>
                          <div class="invalid-feedback">
                            Please provide a valid state.
                          </div>
                        </div>

                        <div class="col-md-3 mb-3">
                          <label for="zip">Zip</label>
                          <input type="text" class="form-control" id="zip" placeholder="" required>
                          <div class="invalid-feedback">
                            Zip code required.
                          </div>
                        </div>
                      </div>

                        <hr class="mb-4">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="same-address">
                          <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="save-info">
                          <label class="custom-control-label" for="save-info">Save this information for next time</label>
                        </div>
                        <hr class="mb-4">

                        <ul class="list-group mb-3">
                          <li class="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                          </li>
                        </ul>

                        <h4 class="mb-3">Payment</h4>

                        <div class="d-block my-3">
                          <div class="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                            <label class="custom-control-label" for="credit">Credit card</label>
                          </div>
                          <div class="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="debit">Debit card</label>
                          </div>
                          <div class="custom-control custom-radio">
                            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="paypal">Paypal</label>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" placeholder="" required>
                            <small class="text-muted">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                              Name on card is required
                            </div>
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="cc-number">Credit card number</label>
                            <input type="text" class="form-control" id="cc-number" placeholder="" required>
                            <div class="invalid-feedback">
                              Credit card number is required
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                            <div class="invalid-feedback">
                              Expiration date required
                            </div>
                          </div>
                          <div class="col-md-3 mb-3">
                            <label for="cc-expiration">CVV</label>
                            <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                            <div class="invalid-feedback">
                              Security code required
                            </div>
                          </div>
                        </div>
                        <hr class="mb-4">

                        <button type="button" id="btnCheckout" class="btn btn-primary">Checkout</button>

                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog"  aria-hidden="true">
                          <div class="modal-dialog" >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Purchase successfully completed</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p>Thank you ${user.username} for your purchase</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;

    const main = document.querySelector('main');
    main.innerHTML = html;

    
      // eslint-disable-next-line no-undef
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
     
      const btnCheckout = document.getElementById('btnCheckout');
      
      btnCheckout.addEventListener('click', async (e) => {
        e.preventDefault();
        myModal.show();

        setTimeout(() => {
          myModal.hide();
          Navigate('/');
        }, 3000);
        
      });
      
}



export default CheckoutPage;