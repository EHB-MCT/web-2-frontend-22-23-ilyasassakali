"use strict"

window.onload = function () {

    fetchMoreInfoPage();

    function fetchMoreInfoPage() {
        //https://youtu.be/CZP1iQFQjEY  
        const idkey = window.location.search;
        const urlParams = new URLSearchParams(idkey);
        const trackID = urlParams.get('idtrack');
        const albumID = urlParams.get('idalbum');
        const artistID = urlParams.get('idartist');


        if (trackID) {
            //fetch moreinfo about tracks
            DZ.api(`/track/${trackID}`, function (response) {


                let htmlString = "";

                const coverImage = response.album.cover_big
                const title = response.title
                const artist = response.artist.picture_medium
                const artistname = response.artist.name
                const type = response.type
                const date = response.album.release_date
                const trackOfAlbum = response.album.title
                const preview = response.preview

                let duration = response.duration
                //https://bobbyhadz.com/blog/javascript-convert-seconds-to-minutes-and-seconds
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;

                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
                }
                const durationmin = `${padTo2Digits(minutes)}min ${padTo2Digits(seconds)}sec`;

                htmlString += ` <div class="elementContainer">
                        <div >
                         <img class="bigimg" src="${coverImage}" alt="">
                         </div>
                     <div class='bigtitle'>
                         <h2>${title}</h2> 
                         <div class="artsec">
                         <a href="" ><img class="smallimg" src="${artist}" alt=""></a>
                         <p class="artp">${artistname}</p>      
                     </div>
                     <div class="textsection">
                     <p>Type: ${type}</p>
                     <p>Release Date: ${date}</p>
                     <p>Duration: ${durationmin}</p>
                     <p>Track of Album: ${trackOfAlbum}</p>
                     </div> 
                      </div>
                   </div>
                   <div class='btns'>
                         <button id="moreinfobtn" class="moreinfobtn">PLAY</button>
                         <button id="moreinfobtn2" class="moreinfobtn2">MUZZ</button>
                         </div>`

                document.getElementById("showContainer").innerHTML = htmlString;

                //redirect you to DoMuzz page
                const muzzbtn = document.getElementById('moreinfobtn2')
                muzzbtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.assign(`./domuzz.html?idtrack=${trackID}`)
                })


                playPreview();

                function playPreview() {

                    const playbtn = document.getElementById('moreinfobtn')

                    playbtn.addEventListener("click", () => {

                        let htmlString = "";
                        htmlString += `<div class="track">
                        <div class="pictrack">
                            <img src="${coverImage}">
                        </div>
                        <div class="nametrack">
                            <p>${title}</p>
                            <p class="trackartist">${artistname}</p>
                        </div>
                    </div>
        
                    <div id="container-audio" class="container-audio">
                        <audio controls loop autoplay>
                            <source src="${preview}">
                        </audio>
                    </div>
                    <button class="moreinfobtn3">MUZZ</button>`
                        document.getElementById("playerNav").innerHTML = htmlString;
                    })
                }

                //show related titles of artist of the moment in top section
                const id = response.artist.id
                DZ.api(`/artist/${id}/top`, function (response) {


                    response.data.slice(0, 5).forEach(item => {

                        const minicoverImage = item.album.cover_medium
                        const minititle = item.title
                        const miniartist = item.artist.name
                        const miniid = item.id

                        const minialbum = item.album.title
                        const miniduration = item.duration

                        //https://bobbyhadz.com/blog/javascript-convert-seconds-to-minutes-and-seconds
                        const minutes = Math.floor(miniduration / 60);
                        const seconds = miniduration % 60;

                        function padTo2Digits(num) {
                            return num.toString().padStart(2, '0');
                        }
                        const durationmin = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

                        let htmlString2 = "";
                        let container = document.getElementById("topArtistadd");
                        let htmlString = "";
                        htmlString += ` 
                        <div id=${miniid}  class="trackContaineradd">
                        <div class="subtop">
                            <img src="${minicoverImage}">
                            <div class="blocktitle">
                                 <p>${minititle}</p>
                                <p class="trackartist">${miniartist}</p>
                            </div>
                        </div>
                        <div class="subtext">
                            <p>${minialbum}</p>
                            <p>${durationmin}</p>
                        </div>
                        </div>`

                        htmlString2 += `<h2>Top related Tracks</h2>
                        <div id="trackContainer" class="trackContainer">
                            <div class="subtop">
                                <p>Title</p>
                            </div>
                            <div class="subtext">
                                <p>Album</p>
                                <p>Duration</p>
                            </div>
                        </div>`


                        container.insertAdjacentHTML("beforeend", htmlString);
                        document.getElementById("topArtist").innerHTML = htmlString2;


                        //redirect you to about track page  
                        const hitElement = document.getElementById(miniid)
                        hitElement.addEventListener("click", function (event) {
                            event.preventDefault()

                            window.location.assign(`./moreInfo.html?idtrack=${miniid}`)
                        })
                    });

                })


            })


        } else if (albumID) {
            //fetch moreinfo about albums
            DZ.api(`/album/${albumID}`, function (response) {


                let htmlString = "";

                const coverImage = response.cover_big
                const title = response.title
                const artist = response.artist.picture_medium
                const artistname = response.artist.name
                const type = response.type
                const date = response.release_date
                const numberTracks = response.nb_tracks

                let duration = response.duration
                //https://bobbyhadz.com/blog/javascript-convert-seconds-to-minutes-and-seconds
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;

                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
                }
                const durationmin = `${padTo2Digits(minutes)}min ${padTo2Digits(seconds)}sec`;



                htmlString += ` <div class="elementContainer">
                <div >
                 <img class="bigimg" src="${coverImage}" alt="">
                 </div>
             <div class='bigtitle'>
                 <h2>${title}</h2> 
                 <div class="artsec">
                 <a href="" ><img class="smallimg" src="${artist}" alt=""></a>
                 <p class="artp">${artistname}</p>      
             </div>
             <div class="textsection">
             <p>Type: ${type}</p>
             <p>Release Date: ${date}</p>
             <p>Duration: ${durationmin}</p>
             <p>Number of Tracks: ${numberTracks}</p>
             </div> 
              </div>
           </div>
           <div class='btns'>
                 
                 <button id="moreinfobtn2" class="moreinfobtn2">MUZZ</button>
                 </div>`

                document.getElementById("showContainer").innerHTML = htmlString;

                //redirect you to DoMuzz page
                const muzzbtn = document.getElementById('moreinfobtn2')
                muzzbtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.assign(`./domuzz.html?idalbum=${albumID}`)
                })

                //show the tracks of the album

                response.tracks.data.forEach(function (track, index) {
                    let htmlString3 = "";
                    //const coverImage = track.response.cover_big

                    const minicoverImage = track.album.cover_medium
                    const minititle = track.title
                    const miniid = track.id
                    const position = index + 1
                    const miniduration = track.duration

                    //https://bobbyhadz.com/blog/javascript-convert-seconds-to-minutes-and-seconds
                    const minutes = Math.floor(miniduration / 60);
                    const seconds = miniduration % 60;

                    function padTo2Digits(num) {
                        return num.toString().padStart(2, '0');
                    }
                    const durationmin = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

                    htmlString3 += ` 
                    <div id=${miniid}  class="trackContaineradd">
                    <div class="subtop">
                        <img src="${minicoverImage}">
                        <div class="blocktitle">
                             <p>${minititle}</p>
                        </div>
                    </div>
                    <div class="subtext">
                        <p>${position}</p>
                        <p>${durationmin}</p>
                    </div>
                    </div>`



                    let container = document.getElementById("topArtistadd");

                    let htmlString2 = "";

                    htmlString2 += `<h2>Tracks of the album</h2>
                            <div id="trackContainer" class="trackContainer">
                                <div class="subtop">
                                    <p>Title</p>
                                </div>
                                <div class="subtext">
                                    <p>#</p>
                                    <p>Duration</p>
                                </div>
                            </div>`

                    document.getElementById("topArtist").innerHTML = htmlString2;
                    container.insertAdjacentHTML("beforeend", htmlString3);

                    //redirect you to track about page  
                    const hitElement = document.getElementById(miniid)
                    hitElement.addEventListener("click", function (event) {
                        event.preventDefault()

                        window.location.assign(`./moreInfo.html?idtrack=${miniid}`)
                    })

                })



            })
        } else if (artistID) {
            //fetch moreinfo about albums
            DZ.api(`/artist/${artistID}`, function (response) {


                let htmlString = "";

                const coverImage = response.picture_big
                const artistname = response.name
                const type = response.type
                const numberFans = response.nb_fan
                const numberAlbums = response.nb_album
                const radio = response.radio



                htmlString += ` <div class="elementContainer">
                <div >
                 <img class="bigimg" src="${coverImage}" alt="">
                 </div>
             <div class='bigtitle2'>
             <h2>${artistname}</h2>  
                 <div class="artsec"> 
             </div>
             <div class="textsection">
             <p>Type: ${type}</p>
             <p>Number of Fans: ${numberFans}</p>
             <p>Number of Releases: ${numberAlbums}</p>
             <p>Radio: ${radio}</p>
             </div> 
              </div>
           </div>
           <div class='btns'>
                 <button id="moreinfobtn2" class="moreinfobtn2">MUZZ</button>
                 </div>`

                document.getElementById("showContainer").innerHTML = htmlString;


                //redirect you to DoMuzz page
                const muzzbtn = document.getElementById('moreinfobtn2')
                muzzbtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.assign(`./domuzz.html?idartist=${artistID}`)
                })


                //show related artists of chosen artist 

                DZ.api(`/artist/${artistID}/related`, function (response) {


                    response.data.slice(0, 18).forEach(item => {
                        const minicoverImage = item.picture_medium
                        const artistname = item.name
                        const miniid = item.id
                        let htmlString2 = "";
                        let container = document.getElementById("flexartsec");
                        let htmlString = "";
                        htmlString += `
                             <div  id=${miniid} id="artsection" class="artsection">
                                 <img src="${minicoverImage}">
                            <p>${artistname}</p>
                             </div>`

                        htmlString2 += `<h2 style="margin-bottom:30px">Related Artists</h2>`
                        container.insertAdjacentHTML("beforeend", htmlString);
                        document.getElementById("topArtist").innerHTML = htmlString2;

                        //redirect you to artist about page  
                        const artistElement = document.getElementById(miniid)
                        artistElement.addEventListener("click", function (event) {
                            event.preventDefault()

                            window.location.assign(`./moreInfo.html?idartist=${miniid}`)
                        })

                    })


                })


            })
        }
    }
}