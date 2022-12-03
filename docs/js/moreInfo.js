"use strict"

window.onload = function () {

    fetchMoreInfoPage();

    function fetchMoreInfoPage() {
        //https://youtu.be/CZP1iQFQjEY
        const idkey = window.location.search;
        const urlParams = new URLSearchParams(idkey);
        const trackID = urlParams.get('id');

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
                                 <div class='btns'>
                                 <button class="moreinfobtn">PLAY</button>
                                 <button class="moreinfobtn2">MUZZ IT</button>
                                 </div>
                              </div>
                           </div>`

            document.getElementById("showContainer").innerHTML = htmlString;

        })

    }


}