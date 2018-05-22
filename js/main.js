
document.querySelector("#pincode").addEventListener("click", getLocation);
function getLocation(e) {
    e.preventDefault();
    const pin = document.querySelector(".pin").value;
    fetch(`https://api.zippopotam.us/IN/${pin}`).then(function (response) {
        if (response.status != 200) {
            document.getElementById('pincodeInput').classList.add('wrongPincode');
            document.querySelector("#output").innerHTML = `<div class="card border-danger">
                                                                    <div class="card-header bg-danger text-white">
                                                                        <p>Oops!!!</p>
                                                                    </div>  
                                                                     <div class="card-body">
                                                                            <blockquote class="blockquote mb-0">
                                                                               <p>Invalid Pincode, Please try again</p>
                                                                            </blockquote>
                                                                      </div>
                                                            </div>`;
            throw Error(response.statusText);
        } else {
            document.getElementById('pincodeInput').classList.remove('rightPincode');
            return response.json();
        }
    }).then(function (data) {
        let op = "";
        data.places.forEach(function (place) {
            op +=`<div class="card border-info ">
                             <div class="card-header bg-info text-white">Location Detail</div>
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                                <ul class="list-group">
                                                    <li><strong>City/Place: </strong>${place["place name"]}</li>
                                                    <li><strong>State: </strong>${place["state"]}</li>
                                                </ul>
                                     </blockquote> 
                                 </div>
                            </div> <br>`;
        });
        document.querySelector("#output").innerHTML = op;
        document.getElementById('pincodeInput').classList.add('rightPincode');
        document.getElementById('pincodeInput').classList.remove('wrongPincode');
    }).catch(function (err) {
        return console.log(err);
    });
}

