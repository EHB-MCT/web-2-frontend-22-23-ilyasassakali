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
                //console.log("fetch:", response);

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

                htmlString += `<div id="elementContainer" class="elementContainer">
                        <div >
                         <img id="bigimg" class="bigimg" src="${coverImage}" alt="">
                         </div>
                     <div id="bigtitle" class='bigtitle'>
                         <h2>${title}</h2> 
                         <div class="artsec">
                         <a href="" ><img class="smallimg" src="${artist}" alt=""></a>
                         <p id="artp" class="artp">${artistname}</p>      
                     </div>
                     <div class="textsection">
                     <p>Type: ${type}</p>
                     <p>Release Date: ${date}</p>
                     <p>Duration: ${durationmin}</p>
                     <p>Track of Album: ${trackOfAlbum}</p>
                     </div> 
                      </div>
                   </div>
                   <form>
                    <h3>Share your opinion and feelings here</h3>
                    <textarea class="w3review" id="w3review"  rows="4"
                        cols="50">Write here.</textarea>
                    <h3>A score out of 100</h3>
                    <input id="w3review2" class="w3review2" type="number" max="100" min="0">
                    <br>
                    <input id="moreinfobtn" class="moreinfobtn" type="submit" value="PUBLISH">
                </form>`

                document.getElementById("showContainer").innerHTML = htmlString;

                //save track as muzzy and redirect to all muzzypage
                const savebtn = document.getElementById('moreinfobtn')
                savebtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    //console.log("ta cliquez");

                    //https://tecadmin.net/get-current-date-time-javascript/
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes();



                    let user = JSON.parse(sessionStorage.getItem('user'))
                    let muzzy = {}
                    muzzy.muzzyimg = document.getElementById('bigimg').src;
                    muzzy.muzzytrack = document.getElementById('bigtitle').firstElementChild.innerHTML;
                    muzzy.muzzyartist = document.getElementById('artp').innerHTML;
                    muzzy.opinion = document.getElementById('w3review').value;
                    muzzy.score = Number(document.getElementById('w3review2').value)
                    muzzy.username = user.username
                    muzzy.date = date
                    muzzy.time = time
                    muzzy.idtrack = trackID

                    //console.log("kaka", muzzy.idtrack);

                    if ((muzzy.opinion && muzzy.score) && (muzzy.score <= 100 && muzzy.score >= 0)) {
                        //add  muzzy in db
                        getData("http://localhost:3000/savemuzzy", "POST", muzzy).then(data => {
                            //alert(data.message)
                            postinmymuzzy()
                        })
                        async function getData(url, method, data) {
                            let resp = await fetch(url, {
                                method: method,
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            return await resp.json();
                        }
                    } else if (muzzy.score > 100 || muzzy.score < 0) {
                        alert("the score must be between 0 and 100!")
                    } else {
                        alert("Some fields are missing: opinion, score!")
                    }
                })
            })
        } else if (albumID) {
            //fetch moreinfo about albums
            DZ.api(`/album/${albumID}`, function (response) {
                //console.log("fetch:", response);

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
                 <img id="bigimg" class="bigimg" src="${coverImage}" alt="">
                 </div>
             <div id="bigtitle" class='bigtitle'>
                 <h2>${title}</h2> 
                 <div class="artsec">
                 <a href="" ><img class="smallimg" src="${artist}" alt=""></a>
                 <p id="artp" class="artp">${artistname}</p>      
             </div>
             <div class="textsection">
             <p>Type: ${type}</p>
             <p>Release Date: ${date}</p>
             <p>Duration: ${durationmin}</p>
             <p>Number of Tracks: ${numberTracks}</p>
             </div> 
              </div>
           </div>
           <form>
                    <h3>Share your opinion and feelings here</h3>
                    <textarea class="w3review" id="w3review"  rows="4"
                        cols="50">Write here.</textarea>
                    <h3>A score out of 100</h3>
                    <input id="w3review2" class="w3review2" type="number" max="100" min="0">
                    <br>
                    <input id="moreinfobtn" class="moreinfobtn" type="submit" value="PUBLISH">
                </form>`

                document.getElementById("showContainer").innerHTML = htmlString;

                //save album as muzzy and redirect to all muzzypage
                const savebtn = document.getElementById('moreinfobtn')
                savebtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log("ta cliquez");

                    //https://tecadmin.net/get-current-date-time-javascript/
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes();

                    let user = JSON.parse(sessionStorage.getItem('user'))
                    let muzzy = {}
                    muzzy.muzzyimg = document.getElementById('bigimg').src;
                    muzzy.muzzyalbum = document.getElementById('bigtitle').firstElementChild.innerHTML;
                    muzzy.muzzyartist = document.getElementById('artp').innerHTML;
                    muzzy.opinion = document.getElementById('w3review').value;
                    muzzy.score = Number(document.getElementById('w3review2').value)
                    muzzy.username = user.username
                    muzzy.date = date
                    muzzy.time = time
                    muzzy.idalbum = albumID

                    //console.log("go", muzzy.username);
                    if ((muzzy.opinion && muzzy.score) && (muzzy.score <= 100 && muzzy.score >= 0)) {
                        //add  muzzy in db
                        getData("http://localhost:3000/savealbummuzzy", "POST", muzzy).then(data => {
                            //alert(data.message)
                            postinmymuzzy()

                        })
                        async function getData(url, method, data) {
                            let resp = await fetch(url, {
                                method: method,
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            return await resp.json();
                        }
                    } else if (muzzy.score > 100 || muzzy.score < 0) {
                        alert("the score must be between 0 and 100!")
                    } else {
                        alert("Some fields are missing: opinion, score")

                    }
                })
            })
        } else if (artistID) {
            //fetch moreinfo about albums
            DZ.api(`/artist/${artistID}`, function (response) {
                //console.log("fetch:", response);

                let htmlString = "";

                const coverImage = response.picture_big
                const artistname = response.name
                const type = response.type
                const numberFans = response.nb_fan
                const numberAlbums = response.nb_album
                const radio = response.radio

                //console.log(coverImage);

                htmlString += ` <div class="elementContainer">
                <div >
                 <img id="bigimg" class="bigimg" src="${coverImage}" alt="">
                 </div>
             <div class='bigtitle2'>
             <h2 id="artp">${artistname}</h2>  
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
           <form>
                    <h3>Share your opinion and feelings here</h3>
                    <textarea class="w3review" id="w3review"  rows="4"
                        cols="50">Write here.</textarea>
                    <h3>A score out of 100</h3>
                    <input id="w3review2" class="w3review2" type="number" max="100" min="0">
                    <br>
                    <input id="moreinfobtn" class="moreinfobtn" type="submit" value="PUBLISH">
                </form>`

                document.getElementById("showContainer").innerHTML = htmlString;

                //save artist as muzzy and redirect to all muzzypage
                const savebtn = document.getElementById('moreinfobtn')
                savebtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log("ta cliquez");

                    //https://tecadmin.net/get-current-date-time-javascript/
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes();

                    let user = JSON.parse(sessionStorage.getItem('user'))
                    let muzzy = {}
                    muzzy.muzzyimg = document.getElementById('bigimg').src;
                    muzzy.muzzyartist = document.getElementById('artp').innerHTML;
                    muzzy.opinion = document.getElementById('w3review').value;
                    muzzy.score = Number(document.getElementById('w3review2').value)
                    muzzy.username = user.username
                    muzzy.date = date
                    muzzy.time = time
                    muzzy.idartist = artistID

                    //console.log("go", muzzy.username);
                    if ((muzzy.opinion && muzzy.score) && (muzzy.score <= 100 && muzzy.score >= 0)) {
                        //add  muzzy in db
                        getData("http://localhost:3000/saveartistmuzzy", "POST", muzzy).then(data => {
                            //alert(data.message)
                            postinmymuzzy()

                        })
                        async function getData(url, method, data) {
                            let resp = await fetch(url, {
                                method: method,
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            return await resp.json();
                        }
                    } else if (muzzy.score > 100 || muzzy.score < 0) {
                        alert("the score must be between 0 and 100!")
                    } else {
                        alert("Some fields are missing: opinion, score")
                    }
                })
            })
        }

        //does a post for having mymuzzys that you've published in your usermuzzy array
        async function postinmymuzzy() {

            let user = sessionStorage.getItem("user");

            await getData("http://localhost:3000/savemyMuzzys", "POST", user).then(data => {
                console.log("conva datamymuzzy:", data);
                alert("Muzzy has been published successfully")
                window.location.href = `./muzzy.html`
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
}