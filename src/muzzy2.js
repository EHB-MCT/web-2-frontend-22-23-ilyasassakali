window.onload = function () {


    refreshmuzzytracks()


    //does a get for having the last muzzy tracks on the page
    async function refreshmuzzytracks() {

        let muzzy = sessionStorage.getItem("muzzy");
        await getData("http://localhost:3000/AllMuzzys", "GET", muzzy).then(data => {


            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                                   <div id="muzzinner-${r}"  class="muzzinner">
                                       <div  class="inimg" id="inimg" >
                                           <img id="inimg" src="${data[r].muzzyimg}">
                                       </div>
                                       <div id="${data[r].idtrack}" class="text">
                                           <h3 class="inp3" id="inp3">Track: ${data[r].muzzytrack} - Artist: ${data[r].muzzyartist}</h3>
                                           <p class="inp4" id="inp4">Opinion: ${data[r].opinion}</p>
                                           <p class="inp2" id="inp2">Score: ${data[r].score}/100</p>
                                       </div>
                                       <div class="addedbby">
                                           <p id="inp5">added by:<br> ${data[r].username}</p>
                                           <p id="inp5">added date:<br> ${data[r].date}<br> ${data[r].time}</p>
                                       </div>
                                   </div>
                                           `

            }

            document.getElementById("muzzelement").innerHTML = htmlString;

            //redirect you to about page of clicked muzzy
            for (let r = data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const trackID = data[r].idtrack
                    window.location.href = `./moreInfo.html?idtrack=${trackID}`;
                })
            }
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
        refreshmuzzyalbums()
    }

    //does a get for having the last muzzy albums on the page
    async function refreshmuzzyalbums() {

        let muzzy = sessionStorage.getItem("muzzy");
        await getData("http://localhost:3000/AllalbumMuzzys", "GET", muzzy).then(data => {


            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                           <div id="muzzinner2-${r}" class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div  id="${data[r].idalbum}" class="text">
                                   <h3 class="inp3" id="inp3">Album: ${data[r].muzzyalbum} - Artist: ${data[r].muzzyartist}</h3>
                                   <p class="inp4" id="inp4">Opinion: ${data[r].opinion}</p>
                                   <p class="inp2" id="inp2">Score: ${data[r].score}/100</p>
                               </div>
                               <div class="addedbby">
                                   <p id="inp5">added by:<br> ${data[r].username}</p>
                                   <p id="inp5">added date:<br> ${data[r].date}<br> ${data[r].time}</p>
                               </div>
                           </div>
                                   `
            }


            document.getElementById("muzzelement2").innerHTML = htmlString;

            //redirect you to about page of clicked muzzy
            for (let r = data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner2-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const albumID = data[r].idalbum
                    window.location.href = `./moreInfo.html?idalbum=${albumID}`;
                })
            }

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
        refreshmuzzyartists()
    }

    //does a get for having the last muzzy artists on the page
    async function refreshmuzzyartists() {

        let muzzy = sessionStorage.getItem("muzzy");
        await getData("http://localhost:3000/AllartistMuzzys", "GET", muzzy).then(data => {


            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += ` 
                           <div id="muzzinner3-${r}"  class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div id="${data[r].idartist}" class="text">
                                   <h3 class="inp3" id="inp3">Artist: ${data[r].muzzyartist}</h3>
                                   <p class="inp4" id="inp4">Opinion: ${data[r].opinion}</p>
                                   <p class="inp2" id="inp2">Score: ${data[r].score}/100</p>
                               </div>
                               <div class="addedbby">
                                   <p id="inp5">added by:<br> ${data[r].username}</p>
                                   <p id="inp5">added date:<br> ${data[r].date}<br> ${data[r].time}</p>
                               </div>
                           </div>
                                   `
            }


            document.getElementById("muzzelement3").innerHTML = htmlString;

            //redirect you to about page of clicked muzzy
            for (let r = data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner3-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const artistID = data[r].idartist
                    window.location.href = `./moreInfo.html?idartist=${artistID}`;
                })
            }

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
        refreshMymuzzystracks();
    }

    //show mymuzzys that you've published with delete a trackmuzzy
    async function refreshMymuzzystracks() {
        let user = sessionStorage.getItem("user");

        await getData("http://localhost:3000/allmyMuzzys", "POST", user).then(data => {


            let htmlString = ""
            for (let r = data.data.length - 1; r >= 0; r--) {

                htmlString += `
                                   <div id="muzzinner4-${r}"  class="muzzinner">
                                       <div  class="inimg" id="inimg" >
                                           <img id="inimg" src="${data.data[r].muzzyimg}">
                                       </div>
                                       <div id="${data.data[r].idtrack}" class="text">
                                           <h3 class="inp3" id="inp3">Track: ${data.data[r].muzzytrack} - Artist: ${data.data[r].muzzyartist}</h3>
                                           <p class="inp4" id="inp4">Opinion: ${data.data[r].opinion}</p>
                                           <p class="inp2" id="inp2">Score: ${data.data[r].score}/100</p>
                                       </div>
                                       <div class="addedbby">
                                           <p id="inp5">added by:<br> ${data.data[r].username}</p>
                                           <p id="inp5">added date:<br> ${data.data[r].date}<br> ${data.data[r].time}</p>
                                           
                                       </div>
                                   </div>
                                   <p class="deletemuzzy" id="deletemuzzytrack-${r}" href="">delete muzzy</p>
                                           `

            }

            document.getElementById("muzzelement4").innerHTML = htmlString;

            //redirect you to about page of clicked muzzy
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner4-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const trackID = data.data[r].idtrack
                    window.location.href = `./moreInfo.html?idtrack=${trackID}`;
                })
            }


            //delete a muzzy track
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`deletemuzzytrack-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const uuidmuzzy = data.data[r].uuid


                    getData(`http://localhost:3000/deletemuzzy/${uuidmuzzy}`, "DELETE").then(data => {
                        alert("Muzzy deleted succesfully, we will reload this page!.")
                        location.reload();
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

        })
        async function getData(url, method, body) {
            let resp = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json"
                },
                body

            });
            return await resp.json();
        }

        refreshMymuzzysalbums();
    }

    //does a get for having mymuzzys that you've published for albums
    async function refreshMymuzzysalbums() {
        let user = sessionStorage.getItem("user");

        await getData("http://localhost:3000/allmyMuzzysalbum", "POST", user).then(data => {


            let htmlString = ""
            for (let r = data.data.length - 1; r >= 0; r--) {

                htmlString += `
                                   <div id="muzzinner5-${r}"  class="muzzinner">
                                       <div  class="inimg" id="inimg" >
                                           <img id="inimg" src="${data.data[r].muzzyimg}">
                                       </div>
                                       <div id="${data.data[r].idalbum}" class="text">
                                           <h3 class="inp3" id="inp3">Album: ${data.data[r].muzzyalbum} - Artist: ${data.data[r].muzzyartist}</h3>
                                           <p class="inp4" id="inp4">Opinion: ${data.data[r].opinion}</p>
                                           <p class="inp2" id="inp2">Score: ${data.data[r].score}/100</p>
                                       </div>
                                       <div class="addedbby">
                                           <p id="inp5">added by:<br> ${data.data[r].username}</p>
                                           <p id="inp5">added date:<br> ${data.data[r].date}<br> ${data.data[r].time}</p>
                                           
                                       </div>
                                   </div>
                                   <p class="deletemuzzy" id="deletemuzzyalbum-${r}" href="">delete muzzy</p>
                                           `

            }

            document.getElementById("muzzelement5").innerHTML = htmlString;


            //redirect you to about page of clicked muzzy
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner5-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const albumID = data.data[r].idalbum
                    window.location.href = `./moreInfo.html?idalbum=${albumID}`;
                })
            }

            //delete a muzzy album
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`deletemuzzyalbum-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const uuidmuzzy = data.data[r].uuid

                    /**/
                    getData(`http://localhost:3000/deletemuzzyalbum/${uuidmuzzy}`, "DELETE").then(data => {
                        alert("Muzzy deleted succesfully, we will reload this page!.")
                        location.reload();
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
                    /**/

                })
            }

        })
        async function getData(url, method, body) {
            let resp = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json"
                },
                body

            });
            return await resp.json();
        }
        refreshMymuzzysartists()
    }

    //does a get for having mymuzzys that you've published for albums
    async function refreshMymuzzysartists() {
        let user = sessionStorage.getItem("user");

        await getData("http://localhost:3000/allmyMuzzysartist", "POST", user).then(data => {


            let htmlString = ""
            for (let r = data.data.length - 1; r >= 0; r--) {

                htmlString += `
                                   <div id="muzzinner6-${r}"  class="muzzinner">
                                       <div  class="inimg" id="inimg" >
                                           <img id="inimg" src="${data.data[r].muzzyimg}">
                                       </div>
                                       <div id="${data.data[r].idartist}" class="text">
                                           <h3 class="inp3" id="inp3">Artist: ${data.data[r].muzzyartist}</h3>
                                           <p class="inp4" id="inp4">Opinion: ${data.data[r].opinion}</p>
                                           <p class="inp2" id="inp2">Score: ${data.data[r].score}/100</p>
                                       </div>
                                       <div class="addedbby">
                                           <p id="inp5">added by:<br> ${data.data[r].username}</p>
                                           <p id="inp5">added date:<br> ${data.data[r].date}<br> ${data.data[r].time}</p>
                                           
                                       </div>
                                   </div>
                                   <p class="deletemuzzy" id="deletemuzzyartist-${r}" href="">delete muzzy</p>
                                           `

            }

            document.getElementById("muzzelement6").innerHTML = htmlString;


            //redirect you to about page of clicked muzzy
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`muzzinner6-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const artistID = data.data[r].idartist
                    window.location.href = `./moreInfo.html?idartist=${artistID}`;
                })
            }

            //delete a muzzy artist
            for (let r = data.data.length - 1; r >= 0; r--) {
                document.getElementById(`deletemuzzyartist-${r}`).addEventListener("click", (event) => {
                    event.preventDefault()
                    const uuidmuzzy = data.data[r].uuid


                    getData(`http://localhost:3000/deletemuzzyartist/${uuidmuzzy}`, "DELETE").then(data => {
                        alert("Muzzy deleted succesfully, we will reload this page!.")
                        location.reload();
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

        })
        async function getData(url, method, body) {
            let resp = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json"
                },
                body

            });
            return await resp.json();
        }
    }
}