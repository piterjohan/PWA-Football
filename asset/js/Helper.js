function addFav() {
    dbPromise.then(function (db) {
        let idTeams = document.getElementById("idTeams").value;
        let datanama = document.getElementById("namaTeams").value;
        let datashortname = document.getElementById("shortnameTeams").value;
        let dataemail = document.getElementById("emailTeams").value;
        let dataphone = document.getElementById("phoneTeams").value;
        let datalastUpdated = document.getElementById("lastUpdatedTeams").value;
        let datawebsite = document.getElementById("websiteTeams").value;

        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        var item = {
            idTeams: idTeams,
            namaTeams: datanama,
            shortName: datashortname,
            email: dataemail,
            phone: dataphone,
            lastUpdated: datalastUpdated,
            website: datawebsite,
            created: new Date().getTime()
        };
        store.add(item); //menambahkan key "buku"
        return tx.complete;
    }).then(function () {
        console.log('Team berhasil disimpan.');
    }).catch(function () {
        console.log('Team gagal disimpan.')
    })
}

function deleteFav() {
    dbPromise.then(function (db) {
        let idTeams = document.getElementById("idTeams").value;
        let dataNumteam = parseInt(idTeams);
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(dataNumteam);
        console.log(idTeams);
        console.log("ini type:" + typeof dataNumteam);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
    });
}

/*Get All Data From IDB */
function readItems() {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.getAll();
    }).then(function (items) {
        // console.log('Data yang diambil: ');
        console.log(items);
        let favItems = ``;
        items.forEach((data) => {
            // console.log(data);
            favItems += `
            <div class="card center">
                <p>Id Teams: ${data.idTeams}</p>
                <a href="./article.html?id=${data.idTeams}">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}" height="400px"/>
                </div>
                </a>
                <div class="card-content">
                    <span class="card-title">${data.namaTeams}</span>
                        <p>Short Name: ${data.shortName}</p>
                        <a href="mailto: ${data.email}">Email:${data.email}</a>
                        <p>Phone: ${data.phone}</p>
                        <p>lastUpdated: ${data.lastUpdated}</p>
                        <a href="${data.website}">${snarkdown(data.website)}</a>
                        <form>
                            <input type="hidden" id="idTeams" value="${data.idTeams}" />
                            <button  class="btn red darken-4" onclick="deleteFav()">Delete Favorite</button>
                        </form>
                </div>
            </div>
            `;
        })
        /*Make A Doom */
        document.getElementById("favoriteItems").innerHTML = favItems;
    });
}

/*save for later by Workbox */
function saveForLater(objItem) {
    dbPromise
        .then(function (db) {
            console.log("objItem:" + objItem);
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            var itemFBCache = {
                idTeams: objItem.id,
                namaTeams: objItem.name,
                shortName: objItem.shortName,
                email: objItem.email,
                phone: objItem.phone,
                lastUpdated: objItem.lastUpdated,
                website: objItem.website,
                created: new Date().getTime()
            };
            store.add(itemFBCache);
            return tx.complete;
        })
        .then(function () {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAllSaveForLater() {
    return new Promise((resolve, reject) => {
        dbPromise
            .then((db) => {
                var tx = db.transaction('teams', 'readonly');
                var store = tx.objectStore('teams');
                return store.getAll();
            })
            .then((objItemSaveForLater) => {
                resolve(objItemSaveForLater);
            })
    })
}