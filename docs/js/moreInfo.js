"use strict"

window.onload = function () {

    go();

    function go() {
        //https://youtu.be/CZP1iQFQjEY
        const idkey = window.location.search;
        const urlParams = new URLSearchParams(idkey);
        const trackID = urlParams.get('id');

        DZ.api(`/track/${trackID}`, function (response) {
            console.log("fetch:", response);

        })

    }


}