const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const select = document.querySelectorAll(".scontainer select")
const btn = document.querySelector(".btn")
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const reverse = document.querySelector(".reverse");




for(let sel of select){
    for(currency in countryList){
        
        let  countrycode = currency;
        let option=  document.createElement("option");
        option.innerText = countrycode;
        
        if (sel.name === "from" && countrycode === "USD"){
            option.selected = "selected";
        }
        else if (sel.name === "to" && countrycode === "INR"){
            option.selected = "selected";
        }
        sel.appendChild(option);
        
    }
    
    
    sel.addEventListener("change", (evt) =>{
        updateflag(evt.target);
    })
}


function updateflag(element){
    // console.log(element.value);
    currencycode = element.value;
    // console.log(currencycode);
    countryname = countryList[currencycode];
    // console.log(countryname);
    let image = element.parentElement.querySelector("img");
    // console.log(image);
    let  newsrc = `https://flagsapi.com/${countryname}/flat/64.png`
    image.src = newsrc;
    
}
btn.addEventListener("click", function(evt){
    evt.preventDefault();
    exchangerate();
})
async function  exchangerate (){
    const amount = document.querySelector(".input");
    let amtval = amount.value;
    if(amtval === "" || amtval <0){
        amtval = 1 ;
        amount.value = 1;
    }
    const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();
    // console.log(from, to);

    let final_url = `${BASE_URL}/${from}.json`
    // console.log(final_url);
    const response = await fetch(final_url);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    
    const rate = data[from][to];
    // console.log(rate);
    const finalrate = rate*amtval ;
    // console.log(finalrate);
   const finalmsg =`Value of ${amtval} ${fromcurr.value} is ${finalrate} ${tocurr.value} ` 
    msg.innerText = finalmsg ;
    amount.value = "";
}

reverse.addEventListener("click", function(){
    let temp = fromcurr.value ;
    fromcurr.value = tocurr.value ;
    tocurr.value = temp ;
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    temp2 = img1.src ;
    img1.src = img2.src ;
    img2.src = temp2 ;
})