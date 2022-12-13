//check the sessionstorage for user

let user = JSON.parse(sessionStorage.getItem('user'))

console.log("this is user:", user);

if (user) {
    document.getElementById('welcomemessage').innerText = `Welcome ${user.username} !`
} else {
    window.location.href = "./index.html"
}


//check the sessionstorage for muzzy

let muzzy = JSON.parse(sessionStorage.getItem('muzzy'))

console.log("this is muzzy:", muzzy);


if (muzzy) {
    document.getElementById('inimg').src = `${muzzy.muzzyimg}`
    document.getElementById('inp3').innerText = `TRACK: ${muzzy.muzzytrack}`
    document.getElementById('inp4').innerText = `ARTIST: ${muzzy.muzzyartist}`
    document.getElementById('inp').innerText = `OPINION: ${muzzy.opinion}`
    document.getElementById('inp2').innerText = `SCORE: ${muzzy.score}/100`

} else {
    console.log("nothing");
}