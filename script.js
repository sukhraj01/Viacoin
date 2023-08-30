
// Filling #options on the basis of #search

let search = document.querySelector("#search");
let entity = document.querySelector("#entity");
let submit = document.querySelector("#submit");

let cryptoDropdownl = document.querySelector("#x");
let cryptoDropdowns = document.querySelector("#cryptodropdown");

search.addEventListener("change", async () => {
    entity.innerHTML = '';
    // console.log(search.value);
    if (search.value == "currency") {

        cryptoDropdownl.style.display = "none";
        cryptoDropdowns.style.display = "none";

        let currUrl = "https://open.er-api.com/v6/latest/USD";
        let currRes = await fetch(currUrl);
        let currData = await currRes.json();

        for (const key in currData.rates) {
            let option = document.createElement("option");
            option.textContent = key;
            entity.appendChild(option);
        }

    }
    else if (search.value == "crypto") {
        let cryptoUrl = "https://api.coincap.io/v2/assets";
        let cryptoRes = await fetch(cryptoUrl);
        let cryptoData = await cryptoRes.json();

        for (let i = 0; i < 100; i++) {
            let option = document.createElement("option");
            option.textContent = cryptoData.data[i].name;
            entity.appendChild(option);
        }

        cryptoDropdownl.style.display = "inline-block";
        cryptoDropdowns.style.display = "inline-block";

    }
    submit.disabled = false;
})

// submit event 
submit.addEventListener("click", async () => {
    let entity_ = document.querySelector("#entity");
    let tbody = document.querySelector("tbody");
    let row = document.createElement("tr");

    tbody.appendChild(row);

    for (let i = 0; i < 3; i++) {
        let col = document.createElement("th");
        if (i == 0) {
            if (search.value == "crypto") col.innerHTML = "Crypto Stats";
            else col.innerHTML = "Exchange Rates";
        }
        else if (i == 1) {
            let cryptodd = document.querySelector("#cryptodropdown");
            if (search.value == "crypto") {
                col.innerHTML = entity.value + ` (${cryptodd.value})`;
            }
            else col.innerHTML = entity.value;
        }
        else if (i == 2) {
            col.innerHTML = "pending";
            if (search.value == "crypto") {
                setTimeout(async () => {
                    let cryptoUrl = "https://api.coincap.io/v2/assets";
                    let cryptodata = await axios.get(cryptoUrl);
                    let cryptodd = document.querySelector("#cryptodropdown");

                    for (let i = 0; i < 100; i++) {

                        if (cryptodata.data.data[i].name == entity.value) {
                            col.innerHTML = cryptodata.data.data[i][cryptodd.value];
                            break;
                        }
                    }
                }, 3000);
            }
            else {
                setTimeout(async () => {
                    let currUrl = "https://open.er-api.com/v6/latest/USD";
                    let currdata = await axios.get(currUrl);
                    col.innerHTML = currdata.data.rates[entity.value] + " (1$)";
                    
                }, 3000)
            }
        }
        row.appendChild(col);
    }

})

let list = document.querySelector("#list");

list.addEventListener("dblclick", (event) => {
    event.target.parentNode.remove();
})
