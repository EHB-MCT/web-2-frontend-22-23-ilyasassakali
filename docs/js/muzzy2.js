window.onload = function () {
    //console.log("okee");

    refreshmuzzytracks()



    //does a get for having the last muzzy tracks on the page
    async function refreshmuzzytracks() {

        let muzzy = sessionStorage.getItem("muzzy");
        await getData("http://localhost:3000/AllMuzzys", "GET", muzzy).then(data => {
            console.log("conva data:", data);

            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                           <div class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div class="text">
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

            console.log("ca c ton string:", htmlString);
            document.getElementById("muzzelement").innerHTML = htmlString;

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
            console.log("conva data:", data);

            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                           <div class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div class="text">
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

            console.log("ca c ton string:", htmlString);
            document.getElementById("muzzelement2").innerHTML = htmlString;

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
            console.log("conva data:", data);

            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                           <div class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div class="text">
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

            console.log("ca c ton string:", htmlString);
            document.getElementById("muzzelement3").innerHTML = htmlString;

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
    }
}