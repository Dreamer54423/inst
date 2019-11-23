checkLogin()

const file = document.getElementById('file')
const button = document.getElementById('button')

button.addEventListener('click', async function () {
    let tmp = file.files[0]
    let result = await fetch('/api/photo/upload',
        {
            method: 'POST',
            body: tmp
             })
           console.log(await result.json())
})