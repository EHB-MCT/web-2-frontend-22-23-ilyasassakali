"use strict"

/*const { result } = require("lodash");*/

/*
const { 
    method
} = require("lodash");*/


document.getElementById('loginform').addEventListener("submit", event => {
    event.preventDefault()

    let user = {}
    user.email = document.getElementById('inputEmail').value;
    user.password = document.getElementById('inputPassword').value;

    if (user.email && user.password) {
        //check for login
        getData("https://web2backend.onrender.com/login", "POST", user).then(result => {
            sessionStorage.setItem('user', JSON.stringify(result.data))
           
            alert(result.message)
            if (sessionStorage.user != 'undefined') {
                window.location.href = `./html/home.html`
            }

        })
    } else {
        alert("Some fields are missing: email, password")
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