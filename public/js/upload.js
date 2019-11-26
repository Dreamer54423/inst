checkLogin()

const file = document.getElementById('file')
const button = document.getElementById('button')

button.addEventListener('click', async function () {
    let tmp = file.files[0]
    let form = new FormData()
    form.append('file', tmp)
    form.append('hash', getCookie('hash'))
    let result = await fetch('/api/photo/upload',
        {
            method: 'POST',
            body: form
        })
    result = await result.json()
    if (result.error != undefined) {
        alert(result.error.description)
    }
    else {window.location = '/account'}
})
