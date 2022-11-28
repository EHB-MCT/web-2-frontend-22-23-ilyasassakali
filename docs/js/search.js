"use strict"

window.onload = function () {
    searchOnName();

    //search on name with searchbar

    function searchOnName() {
        let searched = document.getElementById('searchbar');
        searched.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
            let searchword = searched.value.toLowerCase()
            DZ.api(`/search/track?q=${searchword}`, function (response) {
                //console.log("search on: ", searchword);
                //console.log("fetch:", response.data);
                let htmlString = "";
                response.data.slice(0, 10).forEach(item => {
                    console.log("here are your items: ", item);
                    const coverImage = item.album.cover_medium
                    const title = item.title
                    const artist = item.artist.name
                    //console.log("c ca", artist);
                    htmlString += ` <div class="elementContainer">
                        <a href=""> <img src="${coverImage}" alt=""></a>
                        <p>${title}</p>
                        <p class="secondp">${artist}</p>
                    </div>`

                    document.getElementById("showContainer").innerHTML = htmlString;

                });

            })

        });



    }


}