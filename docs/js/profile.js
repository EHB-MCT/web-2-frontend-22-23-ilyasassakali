"use strict"

window.onload = function () {


    showUserData()

    async function showUserData() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let uuiduser = user.uuid

        //console.log("tiens", uuiduser);
        await getData(`http://localhost:3000/${uuiduser}`, "GET", user).then(data => {
            console.log("jvaisko:", data);


            let htmlString = ""


            htmlString += `<div class="profiletext">
            <h3 class="datachange">Username: ${data.username}</h3>
            <h3 class="datachange">Email: ${data.email}</h3>
            <h3 class="datachange">Password: ${data.password}</h3>
            </div>
            <div class="btnsections">
                <button class="moreinfobtn3" id="modify" href="">MODIFY ACCOUNT</button>
                <button class="moreinfobtn3" id="logout" href="">SIGN OUT</button>
                <button class="moreinfobtn3" id="delete" href="">DELETE ACCOUNT</button>
                <button  style="display:none" class="moreinfobtn3" id="deleteconfirm" href="">CONFIRM TO DELETE</button>
            </div>
                                    `


            document.getElementById("showContainer").innerHTML = htmlString;


        })
        async function getData(url, method) {
            let resp = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json"
                },
            });
            return await resp.json();
        }

        signout()
        deleteaccount()
        confirmdeleteuser()
    }

    //confirmed to delete user of the db
    function confirmdeleteuser() {
        document.getElementById('deleteconfirm').addEventListener('click', function (event) {
            event.preventDefault()
            console.log("delete succes");
            let user = JSON.parse(sessionStorage.getItem('user'))
            let uuiduser = user.uuid

            getData(`http://localhost:3000/${uuiduser}`, "DELETE", user).then(data => {
                alert("Account deleted succesfully, you will be redirected to the sign in page.")
                sessionStorage.clear()
                window.location.href = "./index.html"
            })

            async function getData(url, method) {
                let resp = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': "application/json"
                    },
                });
                return await resp.json();
            }
        })

    }


    //shows confirm to delete account button
    function deleteaccount() {
        document.getElementById('delete').addEventListener('click', function (event) {
            console.log('are you sur too delete');
            document.getElementById("deleteconfirm").style.display = "inline-block";
        })
    }

    //delete sessionstorage and redirect you to login page
    function signout() {

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