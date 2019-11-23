const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')


button.addEventListener('click', async function(){
    let result = await fetch(`/api/user/login?username=${username.value}&password=${password.value}`)
    result = await result.json()
    if (result.error !== undefined) {
        return alert(result.error.description)
    }

    setCookie('hash', result.response.message.hash, 1)
    window.location = '/account'
    
}
)
