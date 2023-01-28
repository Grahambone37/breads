const React = require('react')
const Default = require('./layouts/default')

//for whatever reason bakers is one down from what comes in as the object
function New(object) {
    //console.log(object)
    let bakerList = object.bakers.map(baker => {
        return (
            <option value={baker.id} key={baker.id}>{baker.name}</option>
        )
    })
    return (
        <Default>
            <h2>Add a new bread</h2>
            <form action="/breads" method="POST">
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" id="name" required></input>
                <label htmlFor='image'>Image</label>
                <input type="text" name="image" id="image"></input>
                <label htmlFor='baker'>Baker</label>
                <select name='baker' id="baker">
                    {bakerList}
                </select>
                <label htmlFor='hasGluten'>Has Gluten?</label>
                <input type="checkbox" name="hasGluten" id="hasGluten" defaultChecked></input>
                <br></br>
                <input type="submit"></input>
            </form>
            <div className="backbutton">
                <a href="/breads"><button>Go back to the index</button></a>
            </div>
        </Default>
    )
}

module.exports = New