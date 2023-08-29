
// Filling #options on the basis of #search

let search = document.querySelector("#search");
let entity = document.querySelector("#entity");

search.addEventListener("change", async () => {
    entity.innerHTML = '';
    console.log(search.value);
    if (search.value == "currency") {
        let currUrl = "https://open.er-api.com/v6/latest/USD";
        let currRes = await fetch(currUrl);
        let currData = await currRes.json();

        for (const key in currData.rates){
            let option = document.createElement("option");
            option.textContent = key;
            entity.appendChild(option);
        }
    }
    else if (search.value == "crypto") {
        let cryptoUrl = "https://api.coincap.io/v2/assets";
        let cryptoRes = await fetch(cryptoUrl);
        let cryptoData = await cryptoRes.json();

        for (let i = 0; i < 100; i++){
            let option = document.createElement("option");
            option.textContent = cryptoData.data[i].name;
            entity.appendChild(option);
        }
    }

})

