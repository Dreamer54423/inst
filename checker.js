function name(text) {
    if(text===undefined)return false
    let status = /^[A-Za-z]{2,100} ?[A-Za-z]{2,100}$/.test(text) //test regularnogo vyrageniya
    return status
}

function username(text) {
    if(text===undefined)return false
    return /^[A-Za-z0-9][A-Za-z0-9_]{4,100}$/.test(text)
}

function password(text) {
    if(text===undefined)return false
    return /^\S{8,100}$/.test(text)
}

function mail(text) {
    if(text===undefined)return false
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text)
}

module.exports ={
    name,username,password,mail
}