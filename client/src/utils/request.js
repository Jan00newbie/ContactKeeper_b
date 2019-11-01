export default (url, requestMeta, callback) => 
    fetch(url, requestMeta)
    .then(res => res.json())
    .then(callback)
    .catch(err => console.log(err))
