"use strict"

document.getElementById('loginform').addEventListener("submit", event => {
    event.preventDefault()

    let user = {}
    user.username = document.getElementById('inputUsername').value;
    user.email = document.getElementById('inputEmail').value;
    user.password = document.getElementById('inputPassword').value;
    user.password2 = document.getElementById('inputPassword2').value;

    if (user.password == user.password2) {
        //register the user
        getData("http://localhost:3000/register", "POST", user).then(data => {
            alert(data.message)
        })
    } else {
        alert("Password do not match")
    }
})




async function getData(url, method, data) {
    let resp = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await resp.json();
}