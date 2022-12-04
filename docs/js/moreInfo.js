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
                console.log("fetch:", response);

                let htmlString = "";

                const coverImage = response.album.cover_big
                const title = response.title
                const artist = response.artist.picture_medium
                const artistname = response.artist.name
                const type = response.type
                const date = response.album.release_date
                const trackOfAlbum = response.album.title

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
                         <button class="moreinfobtn">PLAY</button>
                         <button class="moreinfobtn2">MUZZ</button>
                         </div>`

                document.getElementById("showContainer").innerHTML = htmlString;

            })
        } else if (albumID) {
            //fetch moreinfo about albums
            DZ.api(`/album/${albumID}`, function (response) {
                console.log("fetch:", response);

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

                //console.log(numberTracks);

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
                 
                 <button class="moreinfobtn2">MUZZ</button>
                 </div>`

                document.getElementById("showContainer").innerHTML = htmlString;
            })
        } else if (artistID) {
            //fetch moreinfo about albums
            DZ.api(`/artist/${artistID}`, function (response) {
                console.log("fetch:", response);

                let htmlString = "";

                const coverImage = response.picture_big
                const artistname = response.name
                const type = response.type
                const numberFans = response.nb_fan
                const numberAlbums = response.nb_album

                console.log(coverImage);

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
             <p>Number of Albums: ${numberAlbums}</p>
             </div> 
              </div>
           </div>
           <div class='btns'>
                 
                 <button class="moreinfobtn2">MUZZ</button>
                 </div>`

                document.getElementById("showContainer").innerHTML = htmlString;
            })
        }
    }
}