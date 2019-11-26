const photos = document.getElementById('photos')
const button = document.getElementById('button')
const caption = document.getElementById('caption')
checkLogin();

let marker = null;
let map = null;

(async function(){



    let result = await fetch('/api/photo/get?hash='+ getCookie('hash'))
    result = await result.json()
    for (let image of result.response.message){
        let img = document.createElement('img')
        img.alt = image.id
        img.src = '/api/photo/fetch?id=' + image.id + '&hash=' + getCookie('hash')
        img.className = 'photo'
        img.addEventListener('click', select)
        photos.appendChild(img)
    }
    console.log(result)
})()


function select(){
    this.classList.toggle('dark')
    console.log(this)
}

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50, lng: 14},
        zoom: 8
    })
    google.maps.event.addListener(map, 'click', pick)
}

function pick(event) {
        let x = event.latLng.lat()
        let y = event.latLng.lng()
        if (marker === null){
        marker = new google.maps.Marker({
            position: event.latLang,
            map
        })} else {
            marker.setPosition(event.latLng)
        }
}


button.addEventListener('click', send)

async function send(){
    let url = '/api/post/create?hash=%hash%&photos=%photos%&caption=%caption%&location=%location%'
    url= url.replace('%hash%', getCookie('hash'))
    url= url.replace('%caption%', caption.value)
    url= url.replace('%photos%', getPhotos())
    let result = await fetch(url)
    result = await result.json()
    //todo proverka esli 400 oshibka esli 200 ok
}

function getPhotos() {
    let elements = document.getElementsByClassName('dark')
    let str = []
    for(let element of elements) {
        str.push(element.alt)
    }
    return str.join(',')

}