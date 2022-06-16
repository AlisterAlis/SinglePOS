import { clsItemObj, clsItemLine } from './items.js';
//let clsItems = require('items.js');

//const fs = require('fs')

const itemsArr = [
    new clsItemObj("000001", "First Item", 15),
    new clsItemObj("000002", "Second Item", 25),
    new clsItemObj("000003", "Third Item", 35),
    new clsItemObj("000004", "Forth Item", 45),
    new clsItemObj("000005", "Fifth Item", 55),
]


let lineItem1 = new clsItemLine(itemsArr[0], 1);
let lineItem2 = new clsItemLine(itemsArr[1], 2, 2);
let lineItem3 = new clsItemLine(itemsArr[2], 3, 2);
let lineItem4 = new clsItemLine(itemsArr[3], 4, 2);
let lineItem5 = new clsItemLine(itemsArr[4], 5, 2);

const posRowItems = [lineItem1, lineItem2, lineItem3, lineItem4, lineItem5];

function voidLineItem(lineRowNum){
    let hasVoided = false;
    for (let i = 0; i < posRowItems.length; i++) {
        if (posRowItems[i].rowText === lineRowNum) {
            posRowItems.splice(i,1);
            updateSaleTotal();
            hasVoided = true;
        }
        
        if (hasVoided) {
            posRowItems[i].rownumber = i+1;          
            posRowItems[i].rowText = "ItemRow" + i+1;
        }

    }
    DrawPOSItems();
}

function increaseItemQty(lineRowNum){
    for (let i = 0; i < posRowItems.length; i++) {
        if (posRowItems[i].rowText === lineRowNum) {
            posRowItems[i].qty++;
            posRowItems[i].lineTotal = posRowItems[i].itemObj.price * posRowItems[i].qty;
            updateSaleTotal();
            DrawPOSItems();
        }
    }
}

function decreaseItemQty(lineRowNum){
    for (let i = 0; i < posRowItems.length; i++) {
        if (posRowItems[i].rowText === lineRowNum) {
            (posRowItems[i].qty > 1) ? posRowItems[i].qty-- : 1;
            posRowItems[i].lineTotal = posRowItems[i].itemObj.price * posRowItems[i].qty;
            updateSaleTotal();
            DrawPOSItems();
        }
    }
}

function updateSaleTotal(){
    let total = 0;   
    for (let i = 0; i < posRowItems.length; i++) {
        total += posRowItems[i].lineTotal;
    }
    document.getElementById("txtTotal").innerHTML = "R" + total;
    DrawPOSItems();
}

function getSalesTotal(){
    let total = 0;   
    for (let i = 0; i < posRowItems.length; i++) {
        total += posRowItems[i].lineTotal;
    }
    return total;
}

function DrawPOSItems() {
    let htmlPOSItemRows = "";

    for (let i = 0; i < posRowItems.length; i++) {
        htmlPOSItemRows += posRowItems[i].getItemLineHTML();
    }

    document.getElementById("POSItemRows").innerHTML = htmlPOSItemRows

    for (let i = 0; i < posRowItems.length; i++) {

        document.getElementById("btnVoid"+posRowItems[i].rowText).addEventListener("click", () =>{
            voidLineItem(posRowItems[i].rowText);
        });

        document.getElementById("btnItemQtyInc"+posRowItems[i].rowText).addEventListener("click", () =>{
            increaseItemQty(posRowItems[i].rowText);
        });

        document.getElementById("btnItemQtyDec"+posRowItems[i].rowText).addEventListener("click", () =>{
            decreaseItemQty(posRowItems[i].rowText);
        });
        
    }
    document.getElementById("ulSearchResults").innerHTML = "";
    document.getElementById("inSearchBox").value = "";
    DoPaymentCalculations();
}    


function AddPOSItem(_barcode){
    console.log("add pos item");
   if (itemsArr.find(item => item.barcode === _barcode)){
        //if item isn't added already add it to the item row list
        if (!posRowItems.find(item => item.itemObj.barcode == _barcode)) {
            let newItem = itemsArr[itemsArr.findIndex(item => item.barcode === _barcode)];
            console.log(newItem);
            posRowItems.push(new clsItemLine(newItem, posRowItems.length+1));
            updateSaleTotal();
            DrawPOSItems();
        } //If item already on list increase qty
        else {
            //alert('etet');
            //alert('inc qty of: ' + posRowItems[posRowItems.findIndex(item => item.itemObj.barcode === _barcode)].rowText );
            increaseItemQty(posRowItems[posRowItems.findIndex(item => item.itemObj.barcode === _barcode)].rowText); //lineRowNum
            updateSaleTotal();
            DrawPOSItems();
        }
    }
}

function SearchItems(){

    let searchStr = document.getElementById("inSearchBox").value;

    let searchRes = itemsArr.filter(item => item.barcode.toLowerCase().includes(searchStr) || item.description.toLowerCase().includes(searchStr));

    document.getElementById("ulSearchResults").innerHTML = "";

    if (searchRes.length > 0) {
        //Write items into UL to show search results
        for (let i = 0; i < searchRes.length; i++) {
            //const element = array[i];
            document.getElementById("ulSearchResults").innerHTML += `<ul class="list-unstyled mb-0">
            <li><a tag="${searchRes[i].barcode}" id="searchItem${i}" class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
              <span class="d-inline-block bg-primary rounded-circle p-1"></span>
              ${searchRes[i].barcode} - ${searchRes[i].description}
            </a></li>
          </ul>`;
        }     

        //Add Event handlers to add item to pos row
        for (let i = 0; i < searchRes.length; i++) {
            document.getElementById("searchItem" + i).addEventListener("click", function(event) {
                event.preventDefault();
                let barcode = document.getElementById("searchItem" + i).innerText.substring(0, document.getElementById("searchItem" + i).innerText.indexOf('-')).trim();
                console.log("barcode:" + barcode);
                AddPOSItem(barcode);
                }) 
        }
    } else {
        document.getElementById("ulSearchResults").innerHTML = "";
    }
}

function DoPaymentCalculations(){

    let cashPayment = 0;
    let cardPayment = 0;
    let totalSale = getSalesTotal();

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    //totalSale = getSalesTotal();
    //.replace(/\D/g,'')

    document.getElementById("inCashPayment").value = document.getElementById("inCashPayment").value.replace(/\D/g,'');
    document.getElementById("inCardPayment").value = document.getElementById("inCardPayment").value.replace(/\D/g,'');

    cashPayment = Math.abs(document.getElementById("inCashPayment").value);
    cardPayment = clamp(document.getElementById("inCardPayment").value, 0, totalSale);
    
    
    //console.log("Card payment clamp: " +cardPayment);

    //Card Payments
    document.getElementById("inCardPayment").value = cashPayment
    

    document.getElementById("inCardPayment").value = cardPayment;
    //cardPayment = document.getElementById("inCardPayment").value;



    let outstanding = totalSale - cardPayment - cashPayment;

    //outstanding = (outstanding >= 0) ? outstanding : 0;
    
    //console.log("Total: " + totalSale + "  - Card(" + cardPayment + ") - Cash(" + cashPayment + ") = " + (totalSale - cardPayment - cashPayment));

    document.getElementById("txtOutstanding").innerText = (outstanding >= 0) ? "R" + outstanding : "R" + 0;

    if (outstanding < 0) {
        document.getElementById("txtChange").innerText = "R" + Math.abs(outstanding);
        document.getElementById("lblChange").innerText = "Change:";
    }
    else {
        document.getElementById("txtChange").innerText = "";
        document.getElementById("lblChange").innerText = "";
    }
    

    document.getElementById("inCashPayment").value = "R" + Math.abs(document.getElementById("inCashPayment").value)
    document.getElementById("inCardPayment").value = "R" + Math.abs(document.getElementById("inCardPayment").value);

    if (outstanding > 0) {
        document.getElementById("btnFinishSale").classList.remove("btn-success");
        document.getElementById("btnFinishSale").classList.add("btn-danger")
    }
    else {
        document.getElementById("btnFinishSale").classList.remove("btn-danger");
        document.getElementById("btnFinishSale").classList.add("btn-success")
    }

    
    //document.getElementById("btnFinishSale").classList.css

}

//ERROR HANDING IN FUTURE 
/*
function AddPOSItem(_barcode){
    if (itemsArr.find(item => item.itemObj.barcode == _barcode)) {
        
        posRowItems.push(lineItem1);
        DrawPOSItems();
    }
}
*/   
//document.getElementById("btnVoid").addEventListener("click", voidLineItem("'test'"));

document.getElementById("frmScanBarcode").addEventListener("submit", function(event) {
    event.preventDefault();
    let barcode = document.getElementById("inScanBarcode").value;
    AddPOSItem(barcode);
    document.getElementById("inScanBarcode").value = "";
})

document.getElementById("frmSearchItem").addEventListener("submit", function(event) {
    event.preventDefault();
    SearchItems();
})

document.getElementById("inSearchBox").addEventListener("input", () => {
    SearchItems();
})

document.getElementById("frmCash").addEventListener("submit", function(event) {
    event.preventDefault();
    DoPaymentCalculations();
})

document.getElementById("inCashPayment").addEventListener("change", function(event) {
    event.preventDefault();
    DoPaymentCalculations();
})

document.getElementById("frmCard").addEventListener("submit", function(event) {
    event.preventDefault();
    DoPaymentCalculations();
})

document.getElementById("inCardPayment").addEventListener("change", function(event) {
    event.preventDefault();
    DoPaymentCalculations();
})


document.getElementById("btnFinishSale").addEventListener("click", DrawPOSItems)

DrawPOSItems();

/*
function include(file) {
  
    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;
    
    document.getElementsByTagName('head').item(0).appendChild(script);
    
  }

  include('./items.js');
  */