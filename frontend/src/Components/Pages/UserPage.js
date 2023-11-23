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
                                <div class="d-flex justify-content-between align-items-center mb-5">
                                    <h1 class="fw-bold mb-0 text-black">Personal Information</h1>
                                </div>
                                <hr class="my-4">

                                <ul class="list-group mb-4">
                                    <li class="list-group-item">
                                        <strong>Firstname:</strong> Luc
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Lastname:</strong> Dupont
                                    </li>
                                    <li class="list-group-item">
                                        <strong>birth date:</strong> 14/5/1986
                                    </li>
                                    <li class="list-group-item">
                                        <strong>gender:</strong> Male
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Email:</strong> Luc.Dupont@example.com
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Address:</strong> 123 rue de la rue, Bruxelles
                                    </li>
                                    
                                </ul>

                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#modifyPersonalInfoModal">Modify Personal Information</button>

                               
                            </div>
                        </div>
                        <div class="col-lg-4 bg-grey">
                            <div class="p-5">
                                <h3 class="fw-bold mb-5 mt-2 pt-1">Past Orders</h3>
                                <hr class="my-4">

                                <ul class="list-group mb-4">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Order #123
                                        <span class="badge bg-primary">€ 44.00</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Order #456
                                        <span class="badge bg-primary">€ 65.00</span>
                                    </li>
                                </ul>

                                <hr class="my-4">

                                <div class="d-flex justify-content-between mb-5">
                                    <h5 class="text-uppercase">Total spent</h5>
                                    <h5>€ 109.00</h5>
                                </div>
                                <a href="/" class="btn btn-outline-dark">Place New Order</a>

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

const UserPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = html;

};

export default UserPage;