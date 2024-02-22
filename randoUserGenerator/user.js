/*
    Asincrona
    Esperar a que se ejecuten
    por completo una instruccion
    sin obstruir el hilo de
    procesos
*/

//Formas de manejar la asincronia 
/*
    1. Callbacks --> Desuso!!!
    2. Promesas
    3. Async / Await
*/

//CallBacks
/*
function getUsersWithCallback(callback) {
    fetch('https://randomuser.me/api/?results=10') //Consulta a un EndPoint
        .then(response => response.json()) //Traducir o entender el JSON
        .then(data => {
            const {results} = data; //Desestructura de un objeto
            callback(null, results)// 1. Error / 2. Respuesta
        })
        .catch(error => {
            console.error(error)
            callback(error, null)
        })
}

getUsersWithCallback((error, results) =>{
    if (error) console.error(error)
    const name = document.getElementById('name')
    const sourname = document.getElementById('sourname')
    for (const user of results) {
        console.log(name)
        name.innerText = user.name.first
        sourname.innerText = user.name.last
        phone.innerText = user.phone
    }
})
*/
/*
//Promesas
const getUserWithPromise = () => {
    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api/') //Consulta a un EndPoint
            .then(response => response.json())
            .then(data => {
                const { results } = data
                resolve(results)
            })
            .catch(error => reject(error))
    })
}

getUserWithPromise()
    .then(results => {
        const name = document.getElementById('name')
        const sourname = document.getElementById('sourname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            sourname.innerText = user.name.last
            phone.innerText = user.phone

        }
    })
    .catch(error => console.error(error))
*/
//Async / Await
const getUserWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10') //Se guarda en la constante
        const { results } = await response.json() //DESESTRUCTURA Y PARSEA
        const users = document.getElementById('users')
        for (const user of results) {
            users.innerHTML += `
                <tr>
                    <td>${user.name.first}</td>
                    <td>${user.name.last}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    } catch (error) {
        console.error(error)
    }
}

getUserWithAsync()
