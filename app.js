const getHistoryPrice = () =>{
    return new Promise((resolve, reject)=>{
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
        .then(response => response.json())
        .then((json) =>{
            resolve(json.bpi);
        }).catch(error => console.log(error));
    });
}

const getCurrentPrice = () =>{
    return new Promise((resolve, reject) =>{
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then((json) =>{
            resolve(json.bpi.USD.rate_float);
        }).catch(error => console.log(error));
    });
};

getHistoryPrice().then((all_prices)=>{
    insert_data(all_prices);
}).catch(error => console.log(error));

getCurrentPrice().then((current_price) =>{
    const current = document.querySelector('.current');
    const live_price = document.createElement('h2');
    live_price.innerText = 'Live price: $' + parseFloat(current_price).toFixed(2);
    current.appendChild(live_price);
}).catch(error => console.log(error));

const insert_data = (all_prices) =>{
    const table = document.getElementById('table');
    const keys = Object.keys(all_prices);
    const values = Object.values(all_prices);
    for(let i = 0; i<keys.length; i++){
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.innerText = keys[i].replace('-', '.').replace('-', '.');;
        const tdp = document.createElement('td');
        tdp.innerText = '$' + parseFloat(values[i]).toFixed(2);
        tr.appendChild(tdp);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}