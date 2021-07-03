const fs = require('fs')
const form = document.querySelector('form')
form.addEventListener('submit', save)

function save(e) {
    e.preventDefault();
    nameValue = document.getElementById("name").value
    emailValue = document.getElementById("email").value
    addressValue = document.getElementById("address").value

    let info = {
        name: nameValue,
        email: emailValue,
        address: addressValue,
    }
    fs.writeFile("data.json", JSON.stringify(info), function(err) {
        console.log(err);
    })
    console.log(info);
}