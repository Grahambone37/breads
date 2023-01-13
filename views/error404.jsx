const React = require('react')
const Default = require('./layouts/default')

function error404() {
    //console.log(bread.name)
    return (
        <Default>
            <h1>404 error: not found</h1>
            <li><a href="/breads">Go home</a></li>
        </Default>
    )
}

module.exports = error404