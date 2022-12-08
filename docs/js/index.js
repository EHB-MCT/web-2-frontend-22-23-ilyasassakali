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

    //check for login
    getData("http://localhost:3000/login", "POST", user).then(result => {
        sessionStorage.setItem('user', JSON.stringify(result.data))
        alert(result.message)
        window.location.href = `./home.html`
    })


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