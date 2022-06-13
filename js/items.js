
export class clsItemObj {
    constructor(_Barcode, _Description, _Price){
        this.barcode = _Barcode;
        this.description = _Description;
        this.price = _Price;
    }
}

export class clsItemLine {
    constructor(_itemObj, _rownumber, _qty = 1){
        this.itemObj = _itemObj;
        this.qty = _qty;
        this.rownumber = _rownumber;
        this.rowText = "ItemRow" + _rownumber;
        this.lineTotal = _itemObj.price * _qty;
    }
    getItemLineHTML (){
        return ` 
        <div id="${this.rowText}" class="row row-cols-1 row-cols-md-5 mb-0 pt-1 text-center rounded-3" ${(this.rownumber % 2 === 0) ? "style='background: gainsboro'" : "style='background: #f8f8ff'" }>
        <div class="col-md-2 p-0 ps-1 "> <!--Barcode-->
          <div class="card mb-1 rounded-3 shadow-sm">
              <div id="lblItemBarcode" class="card-body">
                <small class="text-muted fw-light">${this.itemObj.barcode}</small>
              </div>
            </div>
          </div>
          <div class="col-md-4 p-0 px-1"> <!--Description-->
            <div class="card mb-1 rounded-3 shadow-sm">
              <div id="lblItemDescription" class="card-body text-start">
                  <b>${this.itemObj.description}</b>
              </div>
            </div>
          </div>
          <div class="col-md-2 p-0 ps-0"> <!--Item Price-->
            <div class="card mb-1 rounded-3 shadow-sm ">
              <div id="lblItemPrice" class="card-body">
                <b>${this.itemObj.price}</b>
              </div>
            </div>
          </div>
          <div class="col-md-2 p-0 ps-2"> <!--Quanity-->
            <div class="card mb-1 rounded-3 shadow-sm ">
              <div class="card-body">
                <div class="row row-cols-1 row-cols-sm-3 mb-0 text-center">
                  <div class="col">
                    <button id="btnItemQtyDec${this.rowText}" class="btn btn-primary btn-outline-dark py-0 px-2">-</b>
                  </div>
                  <div id="lblItemQty" class="col">
                    <b>${this.qty}</b>
                  </div>
                  <div class="col">
                    <button id="btnItemQtyInc${this.rowText}" class="btn btn-success btn-outline-dark py-0 px-2">+</b>
                  </div>                    
                </div>
              </div>
            </div>
          </div>    
          <div class="col-md-2 p-0 ps-2 pe-1"> <!--Line Total-->
            <div class="card mb-1 rounded-3 shadow-sm ">
              <div class="card-body">
                <div class="row row-cols-1 row-cols-sm-4 mb-0 text-center">
                  <div id="lblItemLineTotal" class="col-sm-10 text-end">
                    <b>${this.lineTotal}</b>
                  </div>
                  <div class="col-sm-1">
                    <button id="btnVoid${this.rowText}" class="btn btn-danger btn-outline-dark py-0 px-1"'>x</b>
                  </div>                    
                </div>
              </div>
            </div>
          </div>                      
      </div>       
        `;
    }    
}

//module.exports = {classObj, classLineObj};
//module.exports = classLineObj
//module.exports = {ItemObj, ItemLineObj};