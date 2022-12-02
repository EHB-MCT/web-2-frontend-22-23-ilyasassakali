"use strict"

window.onload = function () {

    searchOnName();



    function searchOnName() {

        //let clicked = document.getElementsById('radio-group')
        let searched = document.getElementById('searchbar');
        searched.addEventListener("keyup", function (event) {
            let searchword = searched.value.toLowerCase()



            if (document.getElementById('tra').checked) {
                //search track
                //console.log("je cherche:", searchword);

                //console.log("le premier");
                DZ.api(`/search/track?q=${searchword}`, function (response) {
                    //console.log("search on: ", searchword);
                    //console.log("fetch:", response.data);
                    let htmlString = "";
                    response.data.slice(0, 25).forEach(item => {
                        //console.log("here are your items: ", item);
                        const coverImage = item.album.cover_medium
                        const title = item.title
                        const artist = item.artist.name
                        const id = item.id
                        //console.log("c ca", artist);
                        htmlString += ` <div class="elementContainer">
                            <a href="" ><img src="${coverImage}" alt=""></a>
                            <p>${title}</p>
                            <p class="secondp" style="font-size:12px">${artist}</p>
                            <p style="display:none">${id}</p>
                        </div>`

                        document.getElementById("showContainer").innerHTML = htmlString;

                        //redirect you to moreinfopage 
                        const tracks = document.getElementsByClassName("elementContainer")
                        const trackArray = Array.from(tracks)
                        trackArray.map(track => track.addEventListener("click", function (event) {

                            const trackID = track.lastElementChild.innerHTML
                            event.preventDefault()
                            console.log(trackID);

                            window.location.href = `./moreInfo.html?id=${trackID}`;
                        }))
                    });
                })
            } else if (document.getElementById('alb').checked) {
                //search album
                //console.log("le deuxieme");

                DZ.api(`/search/album?q=${searchword}`, function (response) {

                    //console.log("fetch:", response.data);
                    let htmlString = "";
                    response.data.slice(0, 25).forEach(item => {
                        //console.log("here are your items: ", item);
                        const coverImage = item.cover_medium
                        const title = item.title
                        const artist = item.artist.name
                        //console.log("c ca", artist);
                        htmlString += ` <div class="elementContainer">
                 <a href=""> <img src="${coverImage}" alt=""></a>
                 <p>${title}</p>
                 <p class="secondp" style="font-size:12px">${artist}</p>
             </div>`
                        document.getElementById("showContainer").innerHTML = htmlString;
                    });
                })
            } else if (document.getElementById('art').checked) {
                //search artist
                //console.log("troisieme");
                DZ.api(`/search/artist?q=${searchword}`, function (response) {

                    //console.log("fetch:", response.data);
                    let htmlString = "";
                    response.data.slice(0, 25).forEach(item => {
                        //console.log("here are your items: ", item);
                        const coverImage = item.picture_medium
                        const title = item.name
                        const artist = item.nb_fan
                        //console.log("c ca", artist);
                        htmlString += ` <div class="elementContainer">
                 <a href=""> <img src="${coverImage}" alt=""></a>
                 <p>${title}</p>
                 <p class="secondp" style="font-size:12px">${artist} followers</p>
             </div>`
                        document.getElementById("showContainer").innerHTML = htmlString;
                    });
                })
            }

        })


    };





}