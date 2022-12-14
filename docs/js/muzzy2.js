window.onload = function () {
    //console.log("okee");

    refreshmuzzypage()

    function refreshmuzzypage() {

        let muzzy = sessionStorage.getItem("muzzy");
        getData("http://localhost:3000/AllMuzzys", "GET", muzzy).then(data => {
            console.log("conva data:", data);

            let htmlString = ""
            for (let r = data.length - 1; r >= 0; r--) {

                htmlString += `
                           <div class="muzzinner">
                               <div class="inimg" id="inimg" >
                                   <img id="inimg" src="${data[r].muzzyimg}">
                               </div>
                               <div class="text">
                                   <p id="inp3">Track: ${data[r].muzzytrack}</p>
                                   <p id="inp4">Artist: ${data[r].muzzyartist}</p>
                                   <p id="inp">Opinion: ${data[r].opinion}</p>
                                   <p id="inp2">Score: ${data[r].score}/100</p>
                                    </div>
                               <div class="addedbby">
                               <p id="inp5">added by: saylipokemongo</p>
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
    }
}