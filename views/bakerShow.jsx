const React = require('react')
const Default = require('./layouts/Default')

function Show({ baker }) {
    //console.log(baker.id)
    return (
        <Default title="Bakers">
            <h3>{baker.name}</h3>
            <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
            <p>About {baker.name}: {baker.bio}</p>
            <h3>Breads {baker.name} has baked</h3>
            <ul>
                {
                    baker.breads.map((bread) => {
                        return (
                            <li key={bread.id}>
                                <a href={`/breads/${bread.id}`}>
                                    {bread.name}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <form action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE"></input>
            </form>
        </Default>
    )
}

module.exports = Show