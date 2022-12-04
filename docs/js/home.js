"use strict"


window.onload = function () {
    init();

    function init() {
        fetchBigHits();
        fetchBigAlbums();
        fetchBigArtists();
    }

    //fetch todays biggest hits 
    function fetchBigHits() {
        DZ.api('/chart/0/tracks', function (response) {
            //console.log("fetch:", response.data);

            response.data.forEach(item => {
                //console.log("here are your items: ", item);
                const coverImage = item.album.cover_medium
                const title = item.album.title
                const artist = item.artist.name
                const id = item.id
                //console.log("c ca", artist);

                let container = document.getElementById("showContainer");
                let htmlString = "";

                htmlString += ` <div id=${id} class="elementContainer">
                <a href=""> <img src="${coverImage}" alt=""></a>
                <p>${title}</p>
                <p class="secondp" style="font-size:12px">${artist}</p>
            </div>`

                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const tracks = document.getElementsByClassName("elementContainer")
                const trackArray = Array.from(tracks)
                console.log(trackArray);
                trackArray.map(track => track.addEventListener("click", function (event) {

                    const trackID = track.id
                    event.preventDefault()
                    console.log(trackID);

                    window.location.href = `./moreInfo.html?idtrack=${trackID}`;
                }))
            });
        })

    }

    //fetch today big albums
    function fetchBigAlbums() {
        DZ.api('/chart/0/albums', function (response) {
            //console.log("fetch:", response.data);

            response.data.forEach(item => {
                //console.log("here are your items: ", item);

                const coverImage = item.cover_medium
                const album = item.title
                const artist = item.artist.name
                const id = item.id
                //console.log("c ca", artist);

                let container = document.getElementById("showContainer2");
                let htmlString = "";

                htmlString += ` <div id=${id} class="elementContainer">
                <a href=""> <img src="${coverImage}" alt=""></a>
                <p>${album}</p>
                <p class="secondp" style="font-size:12px">${artist}</p>
            </div>`


                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const albums = document.getElementsByClassName("elementContainer")
                const albumArray = Array.from(albums)
                console.log(albumArray);
                albumArray.map(album => album.addEventListener("click", function (event) {
                    event.preventDefault()
                    const albumID = album.id

                    console.log(albumID);

                    window.location.href = `./moreInfo.html?idalbum=${albumID}`;
                }))
            });
        })

    }


    //fetch today big artist
    function fetchBigArtists() {
        DZ.api('/chart/0/artists', function (response) {
            //console.log("fetch:", response.data);

            response.data.forEach(item => {
                console.log("here are your items: ", item);
                const artistImage = item.picture_medium
                const artistName = item.name
                const type = item.type
                const id = item.id
                console.log(type);


                let container = document.getElementById("showContainer3");
                let htmlString = "";

                htmlString += ` <div id=${id} class="elementContainer">
                <a href=""> <img  src="${artistImage}" alt=""></a>
                <p>${artistName}</p>
                <p class="secondp" style="font-size:12px">${type}</p>
            </div>`


                container.insertAdjacentHTML("beforeend", htmlString);

                //redirect you to moreinfopage 
                const artists = document.getElementsByClassName("elementContainer")
                const artistArray = Array.from(artists)
                console.log(artistArray);
                artistArray.map(artist => artist.addEventListener("click", function (event) {
                    const artistID = artist.id
                    event.preventDefault()
                    console.log(artistID);
                    window.location.href = `./moreInfo.html?idartist=${artistID}`;
                }))
            });
        })

    }







}