"use strict"

window.onload = function () {

    searchOnName();

    function searchOnName() {

        let searchclick = document.getElementById('srch');
        let searched = document.getElementById('searchbar');

        //https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
        //search by press enter
        let input = document.getElementById("searchbar");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("srch").click();
            }
        })

        //search by clicking searchbutton
        searchclick.addEventListener('click', function (event) {
            let searchword = searched.value.toLowerCase()

            if (document.getElementById('tra').checked) {
                //search track
                //console.log("je cherche:", searchword);

                //console.log("le premier");
                DZ.api(`/search/track?q=${searchword}`, function (response) {


                    //console.log("la longueur de ton fetch: ", response.total);

                    //triggers other function for displaying the result
                    if (response.total == 0 || response.total == undefined) {
                        showNoResult(searchword);
                    } else {
                        showResult(searchword)
                    }


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
                        htmlString += ` <div id=${id} class="elementContainer">
                            <a href="" ><img src="${coverImage}" alt=""></a>
                            <p>${title}</p>
                            <p class="secondp" style="font-size:12px">${artist}</p>
                        </div>`

                        document.getElementById("showContainer").innerHTML = htmlString;




                        //redirect you to moreinfopage 
                        const tracks = document.getElementsByClassName("elementContainer")
                        const trackArray = Array.from(tracks)
                        console.log(trackArray);
                        trackArray.map(track => track.addEventListener("click", function (event) {
                            event.preventDefault()
                            const trackID = track.id
                            window.location.href = `./moreInfo.html?idtrack=${trackID}`;
                        }))



                    });
                })
            } else if (document.getElementById('alb').checked) {
                //search album
                //console.log("le deuxieme");


                DZ.api(`/search/album?q=${searchword}`, function (response) {

                    //console.log("fetch:", response.data);
                    //triggers other function for displaying the result
                    if (response.total == 0 || response.total == undefined) {
                        showNoResult(searchword);
                    } else {
                        showResult(searchword)
                    }


                    let htmlString = "";
                    response.data.slice(0, 25).forEach(item => {
                        //console.log("here are your items: ", item);
                        const coverImage = item.cover_medium
                        const title = item.title
                        const artist = item.artist.name
                        const id = item.id
                        //console.log("c ca", artist);
                        htmlString += ` <div id=${id} class="elementContainer">
                 <a href=""> <img src="${coverImage}" alt=""></a>
                 <p>${title}</p>
                 <p class="secondp" style="font-size:12px">${artist}</p>
             </div>`
                        document.getElementById("showContainer").innerHTML = htmlString;

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


            } else if (document.getElementById('art').checked) {
                //search artist
                //console.log("troisieme");
                DZ.api(`/search/artist?q=${searchword}`, function (response) {

                    //console.log("fetch:", response.data);
                    //triggers other function for displaying the result
                    if (response.total == 0 || response.total == undefined) {
                        showNoResult(searchword);
                    } else {
                        showResult(searchword)
                    }


                    let htmlString = "";
                    response.data.slice(0, 25).forEach(item => {
                        //console.log("here are your items: ", item);
                        const coverImage = item.picture_medium
                        const title = item.name
                        const artist = item.nb_fan
                        const id = item.id
                        //console.log("c ca", artist);
                        htmlString += ` <div id=${id} class="elementContainer">
                 <a href=""> <img src="${coverImage}" alt=""></a>
                 <p>${title}</p>
                 <p class="secondp" style="font-size:12px">${artist} followers</p>
             </div>`
                        document.getElementById("showContainer").innerHTML = htmlString;

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
        })
    };


    //triggered when no result found and displays no result found for chosen criterias
    function showNoResult(searchword) {
        if (document.getElementById('tra').checked) {
            console.log("there is nothing for:", searchword);
            let htmlString = "";
            htmlString += `<h2 id="showresult">No Tracks found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
            let htmlString2 = "";
            document.getElementById("showContainer").innerHTML = htmlString2;
        } else if (document.getElementById('alb').checked) {
            console.log("there is nothing for:", searchword);
            let htmlString = "";
            htmlString += `<h2 id="showresult">No Albums found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
            let htmlString2 = "";
            document.getElementById("showContainer").innerHTML = htmlString2;
        } else if (document.getElementById('art').checked) {
            console.log("there is nothing for:", searchword);
            let htmlString = "";
            htmlString += `<h2 id="showresult">No Artists found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
            let htmlString2 = "";
            document.getElementById("showContainer").innerHTML = htmlString2;
        }

    }

    //triggered when result found and displays result found for chosen criterias
    function showResult(searchword) {
        if (document.getElementById('tra').checked) {
            let htmlString = "";
            htmlString += `<h2 id="showresult">Tracks found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
        } else if (document.getElementById('alb').checked) {
            console.log("there is nothing for:", searchword);
            let htmlString = "";
            htmlString += `<h2 id="showresult">Albums found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
        } else if (document.getElementById('art').checked) {
            console.log("there is nothing for:", searchword);
            let htmlString = "";
            htmlString += `<h2 id="showresult">Artists found for " ${searchword} "</h2>`
            document.getElementById("moreContainer").innerHTML = htmlString;
        }
    }
}