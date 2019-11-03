export default (input, init, callback) => {
    return fetch(input, setAdditionalHeaders(init))
    .then(res => res.json())
    .then(callback)
    .catch(err => console.log(err))
}


const setAdditionalHeaders = init => {
    const extendedInit = {...init};

    if(!extendedInit.headers){
        extendedInit.headers = {}
    }

    if(localStorage.getItem('token')){
        Object.assign(extendedInit.headers, {'Authorization': `Brearer ${localStorage.getItem('token')}`})
    }
    return extendedInit;
}
