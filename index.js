const express = require("express")// zapusk biblioteku

const mongoDb = require('mongodb')// zapusk mongo databazy

const mongo = mongoDb.MongoClient // klient, simulink

const checker = require('./checker')// podklucenie testov s regex

const server = express()// zapusk bibl

const md5 = require("md5")// zapusk md5 (sozdaet hashy)

const multer = require('multer')  // zapusk multer (nuzen dlya zagruzki failov pri ispolzovanii express)

const bodyParser = require('body-parser') // zapusk bodyParser (obrabatyvaet post zapros)



// GET = req.query
// POST = req.body

server.use(express.static('public/'))// otkryvaet papku public polyovatelyu
server.use(bodyParser.urlencoded()) //ne ponimayu etu chast
//use() для  приложения Express с аргументом, в котором указан URL-путь, что добавит  Router к пути обработки промежуточного слоя????

const db = {
    base: null
}

// a85b72490b48beef4ef3432996de68d2

//endpoint
//not found 0


//signup 1
server.get('/signup', signUp)// vyzov funkcii signUp, kogda vvoditsya zapros .../signup

server.get('/upload', upload)// vyzov funkcii upload, kogda vvoditsya zapros .../upload

// login 2
server.get('/login', logIn) // vyzov funkcii login, kogda vvoditsya zapros .../logIn


//main 3
server.get("/", main)// vyzov funkcii main, kogda vvoditsya zapros .../

//account 4
server.get("/account", account)// vyzov funkcii account, kogda vvoditsya zapros .../account

//add 5
server.get("/add", add)// vyzov funkcii add, kogda vvoditsya zapros .../add


//search 6
server.get("/search", search)// vyzov funkcii search, kogda vvoditsya zapros .../search


//activities 7
server.get("/activities", activities)// vyzov funkcii activities, kogda vvoditsya zapros .../activities

//api
//user signup
server.get('/api/user/signup', apiSignUp)// vyzov funkcii apiSignUp, kogda vvoditsya zapros /api/.../signup

server.get('/api/user/me', getMe)

//user login
server.get('/api/user/login', apiLogIn)// vyzov funkcii apiLogIn, kogda vvoditsya zapros /api/.../login

//create post
server.get('/api/post/create', apiCreatePost)// vyzov funkcii apiCreatePost, kogda vvoditsya zapros /api/.../create

server.post('/api/photo/upload', multer({dest: __dirname + '/photos/'}).single('file'), apiUploadPhoto)// ??
//photo upload

// ukazet vse posty odnogo polzovatelya cherez username
//api.../...?username=... ishet vse posty odnogo polzovatekya

//get posts
server.get('/api/post/get', apiGetPosts) // vyzov funkcii apiGetPhoto, kogda vvoditsya zapros /api/.../get

mongo.connect('mongodb+srv://Nika:Dreamer54423@cluster0-jheeu.mongodb.net/',{useUnifiedTopology: true}, connect) //podkluchaetsya k moemu serveru? zachem  { useUnifiedTopology: true }?

server.get('*', notFound)

function upload(req, res){
    res.sendFile(__dirname + '/public/upload.html')
}

function listen (){
    console.log("hey")
} //dlya proverki podklyucheniya

function logIn(req, res){
    res.sendFile(__dirname + '/public/login.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function signUp (req, res){
    res.sendFile(__dirname + '/public/signup.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function main (req, res){
  console.log(1);
    return res.sendFile(__dirname + '/public/index.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function account (req, res){
    res.sendFile(__dirname + '/public/account.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function activities (req, res){
    res.sendFile(__dirname + '/public/activities.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function add (req, res){
    res.sendFile(__dirname + '/public/add.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function search (req, res){
    res.sendFile(__dirname + '/public/search.html')// путь, где находится наш проект. sendFile=otpravlyaet useru html. __dirname = prodelanny put
}

function connect(err, client){

    // if (err != null){
    //     process.exit(0)//vykluchaet progrmmu,(0)-vykl pogu, (1)-vykl s oshibloy, (-*)/ toge oshibka
    // }


    if (err != null) process.exit(-1) //??? vyhod iz node.js???
    console.log('conected')
    db.base = client.db('instagram')//podkluchwnie baze dannych papki instagram
    server.listen(80, listen)
}




function notFound (req, res) {
    res.sendStatus(404)// otpravlyaet kod oshibki (dobavlyaet 404 v uze gotovoe telo otveta)
}

//api

// request: username=string, passowrd=string, name=string,  mail
// response: error={code=id, disription=string}, response={}
async function apiSignUp(req, res){// async prosto ukazyvaet funkcii s await, chto ee nado podozdat
    const user = req.query //prinimaet dannye dobavlennye v postman


    //check if all fields were given
    if (!checker.name(user.name)) return res.send({error:{code:400, description: 'name is wrong'}})// esli name ne prohodit checkerom.name(ne podhodit pod regex), to vydaet oshibku. ! - prosto forma zapisi??
    if (!checker.username(user.username)) return res.send({error:{code:400, description: 'username is wrong'}})// esli username ne prohodit checkerom.username, to vydaet oshibku. ! - prosto forma zapisi??
    if (!checker.mail(user.mail)) return res.send({error:{code:400, description: 'mail is wrong'}})// esli mail ne prohodit checkerom.mail, to vydaet oshibku. ! - prosto forma zapisi??
    if (!checker.password(user.password)) return res.send({error:{code:400, description: 'password is wrong'}})// esli password ne prohodit checkerom.password, to vydaet oshibku. ! - prosto forma zapisi??

    user.username = user.username.toLowerCase() //perevodit vse bukvy v malenkie

    //check if username is already taken
    let oldUser = await db.base.collection('users').find({username: user.username}).toArray()// await govorit? chto nuzno podozdt funkciyu s async, a potom vypolnyut svoyu funkciyu (v nashem sluchae zdet proverku daannyh). potom v db v papke users ishet objecty s usernamom sootvetstvuyushim user.username.

    if (oldUser.length > 0) {//esli najdenny sushesttvujushiy username po dlinne bolshe 0
      return res.send({error:{code:400, description: 'username is taken'}})// to vydaet, chto takoj user uze suchestvujet i vozvrashaet return.
    }

    await db.base.collection('users').insertOne(user)// v ostalnych sluchajah zdet proverku potom dobavlyaet novogo usera cherez insertOne(dannye s postmana)

    console.log(oldUser)
    // await res.send({respose: {code:201}}) //otvechaet klientu, chto vse ok
    await res.redirect('/login')
}

// request: username=string, passowrd=string
// response: error={code=id, disription=string}, response={code=int, message=user}

async function apiLogIn(req, res){// async prosto ukazyvaet funkcii s await, chto ee nado podozdat

    const user = req.query// beret dannye s postmana

    if (!checker.username(user.username)) return res.send({error:{code:400, description: 'username is wrong'}})// esli username ne prohodit checkerom.username, to vydaet oshibku. ! - prosto forma zapisi??
    if (!checker.password(user.password)) return res.send({error:{code:400, description: 'password is wrong'}})// esli password ne prohodit checkerom.password, to vydaet oshibku. ! - prosto forma zapisi??

    user.username = user.username.toLowerCase()// username perevodit v malenkie bukvy

    let oldUser = await db.base.collection('users').find({username: user.username}).toArray() //posle prohozdenija proverki, ishet v db v papke users username, sootvetstvujushij usernamu vvedennomu v postmane (v requeste) i perevodit najdennye objekty v massiv (spoiler, objekt budet tolko 1)
    if (oldUser.length == 0 ) return res.send({error:{code:400, description:'user not found'}})// esli dlinna massiva s najdenymi usernamami ravna 0, to vozvrashaet oshibku, chto user ne najden

    if (user.password !== oldUser[0].password) return res.send({error:{code:400, description:'wrong password'}})// jesli user najden, to smotrit password emu sootvetstvuyuchij i sravnivaet s objektom, kotory byl najden i pereveden v massiv.


    delete oldUser[0].password //udalyaet stary password. otkuda???
    delete oldUser[0]._id// udalyaet id. otkuda???

    let str = user.username + Date.now() // peremennaya s usernamom i tochnym vremenem. osnova dkya hash
    let hash = md5(str) // sozdaet hash iz nashey osnovy
    let session = {// sozdajet sessiju
        username: user.username,
        hash: hash,
        date: Date.now() + 24*60*60*1000// datu iz milisek v normalmuju
    }

    await db.base.collection('sessions').updateOne({username: user.username}, {$set: session}, {upsert: true})// pervaya= cto ishem, 2= chto menyaem, upsert- sozdaet, esli net v mongo

    oldUser[0].hash = hash //priravnivaet hassh oldusera k hashu sessii

    return res.send({response:{code:200, message: oldUser[0]}}) // vozvrashaet kod uspeha


}

// request: photos=[string...], caption=string, location=[float, float], hash=string
// response: error={code=id, disription=string}, response={code=int, message=post}
async function apiCreatePost(req, res){ // funkcija po sozdaniyu posta

  console.log(req.query);  // lishnee, nu ili dlya proverki
  const query = req.query // berem opyat dannye s postmana

  if(await checkLogin(query.hash, res) != 200) return// zdet priem dannyh i vyzyvaet funkciyu checkLogin (sm.nize). esli v rezultate ne vernulos 200, to konec.
  if (query.photos == undefined) return res.send({respose: {code: 400, description:'Photos are required'}})// proverochka, jest li foto
  if (query.caption == undefined) return res.send({respose: {code: 400, description:'Caption not found'}})// proverochka, jest li caption
  if (query.location == undefined) return res.send({respose: {code: 400, description:'Location are required'}})// proverochka, jest li lokacija
    // check photo id in db
    // let tmpPhotos = query.photos.split(',') // ['wewefwefwefwefw','45r4r45g45g325vb425vb','345vb34r5v3434g34g5']
    // for(let tmp of tmpPhotos) {
    //   let check = await db.base.collection('photos').find({id: tmp).toArray()
    //   if (check.length == 0) return res.send({error:{code:400, description:'photo not found'}})
    // }
  let photos = await db.base.collection('photos').find({id: {$in: query.photos.split(',')}}).toArray()//vybor fotok iz db po id? $in???
  console.log(photos);

  if (photos.length !==  query.photos.split(',').length) return res.send({error:{code:400, description:'photo not found'}})//????

  let post = {
      ///caption. photos, location
      username: (await db.base.collection('sessions').find({hash: query.hash}).toArray())[0].username,// sravnivaet hashy i daet username iz sessii
      date: Date.now(),//data
      location: query.location.split(','), //beret lokacju, kotoruju zadali cherez postman
      caption: query.caption, //beret caption, kotory adali cherez postman
      photos: query.photos.split(','), //vyvodit photky cherez zapyatuju
      likes: [],//['admin', 'timur']
      comment: []//[{admin: 'nice'}, {timur: 'good'}]
  }


  await db.base.collection('posts').insertOne(post) // dobavljaet novy objekt v papku posts v db


  res.send({response:{code: 200, message: null}}) // otvexhaet, chto vse ok
}

async function checkLogin(hash, res) {
  let user = await db.base.collection('sessions').find({hash: hash}).toArray()// nahodit v sessii objekt s takim ze hasham kak hash v parametre funkcii
  if (user[0]===undefined){ //jesli pervy element massiva (nash objekt klienta) raven undef
      return res.send({error: 401, discription: 'unauthorized'})// vozvrat oshibky
  }

  return 200// v ostalnom vozvrat OK

}


// request: file=file hash=string
// response: error={code=id, disription=string}, response={code=int, message=string}
async function apiUploadPhoto(req, res){
  const user = req.body

    let result = await checkLogin(req.body.hash, res) // proverka loginas
    if(result != 200) {// jesli vernulos 200, vse ok. ucspeshnaya avtorizacija
      return
    }

    user = await db.base.collection('sessions').find({hash: user.hash}).toArray()

    let file = {
        id: req.file.filename,// file???
        username: user[0].username,// u nas tut net usera? nuzno dobavit let user = req.require?
        type: req.file.mimetype//file???
    }

    await db.base.collection('photos').insertOne(file)// dobavlenie objekta v papku photos v db

    return res.send({response: {code: 201, message: file.id}})// tipa vse ok
}

// request: username=string, hash=string
// response: error={code=id, description=string}, response={code=int, message=[...post]}
async function apiGetPosts(req, res){
    const user = req.query

if (user.username === undefined) {
  res.send({error: {code:400, description: 'username is required'}})
}

    let userName = user.username.toLowerCase()
    console.log(user);

    let result = await checkLogin(user.hash, res) // proverka loginas.
    if(result != 200) return;

    let posts = await db.base.collection('posts').find({username: userName}).toArray()

    if (posts.length === 0) return res.send({response: {code: 204, message:'no content'}})
    console.log(posts);

    return res.send({response: {code:200 ,  message: posts}})
}


























// request: hash=string
// response: error={code=id, description=string}, response={code=int, message={user:user(name, username, mail), posts: [..posts]}}
async function getMe(req, res) {
    const user = req.query
        let result = await checkLogin(user.hash, res) // proverka loginas.
        if(result != 200) return;

        result = await db.base.collection('sessions').find({hash: user.hash}).toArray()
        let username = result[0].username
        result = await db.base.collection('users').find({username: username}).toArray()
        let posts = await db.base.collection('posts').find({username: username}).toArray()

        delete result[0].password
        delete result[0]._id
        return res.send({code: 200, message: {user: result[0], posts: posts}})
}
