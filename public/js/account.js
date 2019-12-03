checkLogin()

const posts = document.getElementById('posts');

(async function () {
    let result = await fetch('/api/user/me?hash=' + getCookie('hash'))
    result = await result.json()
    for (let post of result.message.posts) {
        let htmlPost = new Post()
        htmlPost.setCaption(post.caption)
        htmlPost.setComments(post.comment.length)
        htmlPost.setLikes(post.likes.length)
        let place = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${post.location[0]}+${post.location[1]}&key=c5d57f7dc5b34709931d2759e88769c0`)
        place = await place.json()
        htmlPost.setLocation(place.results[0].formatted)
        htmlPost.setImage('/api/photo/fetch?hash=' + getCookie('hash') + '&id=' + post.photos[0])
        htmlPost.setDate(new Date(post.date).toDateString())
        posts.innerHTML = posts.innerHTML + htmlPost.get()

    }

})()


//todo как из долготы и широты сделать адресс, найти апи
//добавить дату (день месяц год)
//при нажатии на пост будет ссылка на пост с айди






// let post = new Post()
// post.setCaption('text')
// post.setComments('10')
// post.setImage('/images/1.jpeg')
// post.setLocation('home')
// post.setLikes('10')

// posts.innerHTML = post.get()