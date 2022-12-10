"use strict"

window.onload = function () {

    profileinfo()

    function profileinfo() {

        const deleteSessionStorage = document.getElementById('logout')
        deleteSessionStorage.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("click");
                //https://www.w3schools.com/jsref/met_storage_clear.asp
                sessionStorage.clear()
                window.location.href = "./index.html"
            }

        )
    }


}