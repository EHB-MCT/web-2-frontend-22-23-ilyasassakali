"use strict"


window.onload = function () {

    fetchBigHits();
    fetchBigAlbums();
    fetchBigArtists();

    //fetch todays biggest hits 
    function fetchBigHits() {
        DZ.api('/chart/0/tracks', function (response) {
            ////console.log("fetch:", response.data);

            response.data.forEach(item => {
                ////console.log("here are your items: ", item);
                const coverImage = item.album.cover_medium
                const title = item.album.title
                const artist = item.artist.name
                const id = item.id
                ////console.log("c ca", artist);

                let container = document.getElementById("showContainer");
                let htmlString = "";

                htmlString += ` <div id=${id} class="elementContainer">
                <a href=""> <img src="${coverImage}" alt=""></a>
                <p>${title}</p>
                <p class="secondp" style="font-size:12px">${artist}</p>
            </div>`

                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const hitElement = document.getElementById(id)
                hitElement.addEventListener("click", function (event) {
                    event.preventDefault()
                    window.location.assign(`./moreInfo.html?idtrack=${id}`)
                })
            });
        })
    }

    //fetch today big albums
    function fetchBigAlbums() {
        DZ.api('/chart/0/albums', function (response) {
            console.log("fetch:", response.data);

            response.data.forEach(item => {
                ////console.log("here are your item: ", item);

                const coverImage = item.cover_medium
                const album = item.title
                const artist = item.artist.name
                const id = item.id
                ////console.log("c ca", artist);

                let container = document.getElementById("showContainer2");
                let htmlString = "";

                htmlString += ` <div id=${id} class="elementContainer">
                <a href=""> <img src="${coverImage}" alt=""></a>
                <p>${album}</p>
                <p class="secondp" style="font-size:12px">${artist}</p>
            </div>`

                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const albumElement = document.getElementById(id);
                albumElement.addEventListener("click", (event) => {
                    event.preventDefault()
                    window.location.assign(`./moreInfo.html?idalbum=${id}`)
                })
            });
        })
    }
    //fetch today big artist
    function fetchBigArtists() {
        DZ.api('/chart/0/artists', function (response) {
            ////console.log("fetch:", response.data);

            response.data.forEach(item => {
                ////console.log("here are your items: ", item);
                const artistImage = item.picture_medium
                const artistName = item.name
                const type = item.type
                const id = item.id
                ////console.log(type);

                let container = document.getElementById("showContainer3");
                let htmlString = "";

                htmlString += `<div id=${id} class="elementContainer">
                <a href=""> <img  src="${artistImage}" alt=""></a>
                <p>${artistName}</p>
                <p class="secondp" style="font-size:12px">${type}</p>
            </div>`

                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const artistElement = document.getElementById(id)
                artistElement.addEventListener("click", function (event) {
                    event.preventDefault()
                    window.location.assign(`./moreInfo.html?idartist=${id}`)
                })
            });
        })
    }
}