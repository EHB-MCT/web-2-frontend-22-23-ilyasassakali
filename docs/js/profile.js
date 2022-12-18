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
            let username = data.username
            let email = data.email
            let password = data.password

            if (username == undefined) {
                location.reload();
            }


            htmlString += `<div class="profiletext">
            <h4 class="datachange">Username: ${username}</h4>
            <h4 class="datachange">Email: ${email}</h4>
            <h4 class="datachange">Password: ${password}</h4>
            </div>

           
            <form style="display:none"  class="editform" id="editform">
            <h4 class="datachange">Edit Here:</h4>
            <input type="text" class="InputForm" id="InputForm" name="username" placeholder="New Username" value="${username}">
            <input type="email" class="InputForm" id="InputForm2" name="email" placeholder="New Email" value="${email}">
            <input type="text" class="InputForm" id="InputForm3" name="password" placeholder="New Password" value="${password}">
            <button type="submit" class="moreinfobtn3" id="submitEmailChange">CONFIRM CHANGES</button>
            </form>

            <div class="btnsections">
                <button class="moreinfobtn3" id="edit" href="">EDIT LOGIN INFO</button>
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
        edditaccount()
        updateprofile()
    }

    //eddit username email and password in db
    function updateprofile() {
        document.getElementById("editform").addEventListener('submit', (sevent) => {
            sevent.preventDefault()

            console.log('ta confirmeeeeee');
            // sessionStorage.clear()
            let newusername = document.getElementById('InputForm').value
            let newemail = document.getElementById('InputForm2').value
            let newpassword = document.getElementById('InputForm3').value



            //console.log("new credentialls:", newusername, newemail, newpassword);

            let user = JSON.parse(sessionStorage.getItem('user'))
            let uuiduser = user.uuid

            let updatedInfo = {
                "username": newusername,
                "email": newemail,
                "password": newpassword,
                "uuid": uuiduser
            }

            if (newusername && newemail && newpassword) {
                getData(`http://localhost:3000/${uuiduser}`, "PUT", user).then(data => {
                    alert("Profile changes were successfully updated ")
                    console.log("c koica;", updatedInfo);
                    sessionStorage.setItem('user', JSON.stringify(updatedInfo))
                    location.reload();
                })
            } else {
                alert("Some fields are missing: username, email, password")
            }


            async function getData(url, method) {
                let resp = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(updatedInfo)
                });
                return await resp.json();
            }

        })
    }



    //shows confirm to eddit account form
    function edditaccount() {
        document.getElementById('edit').addEventListener('click', function (event) {
            event.preventDefault()
            console.log('heres the edit form');
            document.getElementById("editform").style.display = "flex";
        })
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