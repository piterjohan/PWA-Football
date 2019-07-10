/*if this block fetch success */
function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        //reject method to make block catch called
        return Promise.reject(new Error(response.statusText));
    } else {
        //turn object into Promise to make "Then"
        return Promise.resolve(response);
    }
}

/* blok to passing json to array JS */
function json(response) {
    return response.json();
}

/* blok to catch error */
function error(error) {
    //param form Promise.reject
    console.log("Error: " + error);

}
/* 
 handling fetch data url,i make function request
 to make clean code
*/
var url = "https://api.football-data.org/v2/teams/";

function fetchData(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': 'f2b4627268804a9a89acccf30b7c8d84',
        },
        dataType: 'json',
        type: 'GET',
        // mode: 'cors'
    })
        .then(status)
        .then(json)
    // .then((res) => res.json())
}


function DataFootball() {
    /*URL */
    let base_url = 'https://api.football-data.org/v2/';
    /*if Offline open caches */
    if ('caches' in window) {
        caches.match(base_url + "teams")
            .then((response) => {
                if (response) {
                    response.json()
                        .then((data) => {
                            console.log("cache" + data);
                            let cachesData = ``;
                            data.teams.forEach((cacheDataTeams) => {
                                cachesData += `
                                <div class="card center">
                                    <a href="./article.html?id=${cacheDataTeams.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${cacheDataTeams.crestUrl}" height="400px"/>
                                </div>
                                    </a>
                                    <div class="card-content">
                                        <span class="card-title">${cacheDataTeams.name}</span>
                                    </div>
                                </div>
                            `;
                            })
                            //doom to html
                            document.getElementById("articles").innerHTML = cachesData;
                        })
                }
            })
    }

    /*Back to Network */
    fetchData(base_url + "teams/")
        .then((data) => {
            // console.log(data);
            let footballDataTeams = ``;
            data.teams.forEach((dataTeams) => {
                footballDataTeams += `
                    <div class="card center">
                        <a href="./article.html?id=${dataTeams.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img src="${dataTeams.crestUrl}" height="400px"/>
                    </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title">${dataTeams.name}</span>
                            <button  class="btn red darken-4" onclick="pushdata()">Test Push</button>
                        </div>
                    </div>
                `;
            })
            //doom to html
            document.getElementById("articles").innerHTML = footballDataTeams;
        })
        .catch(error);
}


function getArticleById() {
    return new Promise(function (resolve, reject) {
        /*URL */
        let base_urla = 'https://api.football-data.org/v2/"teams"';
        // Ambil nilai query parameter (?id=)
        var urlParamsa = new URLSearchParams(window.location.search);
        var idParama = urlParamsa.get("id");
        /*if Offline open caches */
        if ('caches' in window) {
            caches.match(base_urla + "article/" + idParama)
                .then((response) => {
                    if (response) {
                        response.json()
                            .then((data) => {
                                console.log("cache" + data);
                                let cachesData = ``;
                                data.teams.forEach((cacheDataTeams) => {
                                    cachesData += `
                                <div class="card center">
                                    <a href="./article.html?id=${cacheDataTeams.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${cacheDataTeams.crestUrl}" height="400px"/>
                                </div>
                                    </a>
                                    <div class="card-content">
                                        <span class="card-title">${cacheDataTeams.name}</span>
                                    </div>
                                </div>
                            `;
                                })
                                //doom to html
                                document.getElementById("articles").innerHTML = cachesData;
                                /*send data passing for save to indexed db */
                                resolve(data);

                            });
                    }
                });
        }
        /*Get value query paramater */
        let urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        console.log("ID Data:" + idParam);
        /*URL */
        let base_url = 'https://api.football-data.org/v2/';

        fetchData(base_url + "teams/" + idParam)
            .then((data) => {
                // console.log("datanya" + data);
                let detailTeamsID = `
                <div class="card" height="400px">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" height="400px" />
                    </div>
                        <div class="card-content">
                            <span class="card-title center">${data.name}</span>
                            <p>Short Name: ${data.shortName}</p>
                            <a href="mailto: ${data.email}">Email:${data.email}</a>
                            <p>Phone: ${data.phone}</p>
                            <p>lastUpdated: ${data.lastUpdated}</p>
                            <a href="${data.website}"> ${snarkdown(data.website)}</a>
                        </div>
                    <div>
            `;
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("body-content").innerHTML = detailTeamsID;
                /*send data passing for save to indexed db */
                resolve(data);
            });
    });
}
/*save for later */
function getSavedLater() {
    getAllSaveForLater()
        .then((objItemSaved) => {
            console.log(objItemSaved);
            let cachesSavedDataForLater = ``;
            objItemSaved.forEach((dataSaveForLater) => {
                cachesSavedDataForLater += `
                <div class="card center">
                    <p>Id Teams: ${dataSaveForLater.idTeams}</p>
                    <a href="./article.html?id=${dataSaveForLater.idTeams}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${dataSaveForLater.crestUrl}" height="400px"/>
                </div>
                </a>
                <div class="card-content">
                    <span class="card-title">${dataSaveForLater.namaTeams}</span>
                        <p>Short Name: ${dataSaveForLater.shortName}</p>
                        <a href="mailto: ${dataSaveForLater.email}">Email:${dataSaveForLater.email}</a>
                        <p>Phone: ${dataSaveForLater.phone}</p>
                        <p>lastUpdated: ${dataSaveForLater.lastUpdated}</p>
                        <a href="${dataSaveForLater.website}">${snarkdown(dataSaveForLater.website)}</a>
                        <form>
                            <input type="hidden" id="idTeams" value="${dataSaveForLater.idTeams}" />
                            <button  class="btn red darken-4" onclick="deleteFav()">Delete Favorite</button>
                        </form>
                </div>
            </div>
            `;
            })
            /*Doom to html */
            document.getElementById("articlesSavedForLater").innerHTML = cachesSavedDataForLater;
        });
}

/* save for later By ID*/
function getSavedArticleById() {
    var urlParamssv = new URLSearchParams(window.location.search);
    var idParamsv = urlParamssv.get("id");
    console.log("id Truenya: " + idParamsv);
    getById(idParamsv)
        .then(function (SavedArticleById) {
            console.log(SavedArticleById); /*data undefined */
            savedArticleByIdHTML = ``;
            var savedArticleByIdHTML = `
            <div class="card center">
                <p>Id Teams: ${SavedArticleById.idTeams}</p>
                <a href="./article.html?id=${SavedArticleById.idTeams}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${SavedArticleById.crestUrl}" height="400px"/>
                </div>
                </a>
                <div class="card-content">
                    <span class="card-title">${SavedArticleById.namaTeams}</span>
                        <p>Short Name: ${SavedArticleById.shortName}</p>
                        <a href="mailto: ${SavedArticleById.email}">Email:${SavedArticleById.email}</a>
                        <p>Phone: ${SavedArticleById.phone}</p>
                        <p>lastUpdated: ${SavedArticleById.lastUpdated}</p>
                        <a href="${SavedArticleById.website}">${snarkdown(SavedArticleById.website)}</a>
                        <form>
                            <input type="hidden" id="idTeams" value="${SavedArticleById.idTeams}" />
                            <button  class="btn red darken-4" onclick="deleteFav()">Delete Favorite</button>
                        </form>
                </div>
            </div>
            `;
            /*Doom */
            document.getElementById("body-content").innerHTML = savedArticleByIdHTML;

        });

}

/*getById */
function getById(id) {
    console.log("Fgetbyid:" + id);
    var idnum = parseInt(id);
    console.log("ini type:" + typeof idnum);

    return new Promise((resolve, reject) => {
        dbPromise
            .then((db) => {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(idnum);
            }).then(function (articleSavedLater) {
                resolve(articleSavedLater);
            });
    })

}

/*make Database and Object */
var dbPromise = idb.open("SimpanBola", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        var peopleOS = upgradeDb.createObjectStore("teams", {
            keyPath: "idTeams"
        });
        peopleOS.createIndex("datafbTeams", "datafbTeams", {
            unique: false
        });
    }
});