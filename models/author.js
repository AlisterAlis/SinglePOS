// const authorSchema = {
//     "name": "First Author",
// };
//const { FileIndex } = require("git");

class authorSchema {
    constructor(_name){
        this.name = _name;
        this.id = authorsList.length + 1
        //console.log("Cons: " + _name);
    }

    Save(){
        return new Promise((resolve, reject) => {

            authorsList.push(new clsAuthorItem(this.name, this.id))

            console.log(JSON.stringify(authorsList))
            setTimeout(() => {
                if (authorsList[0] == null || authorsList[0] == "") {
                    console.log("Save error: NULL");
                    reject("Value cannot be null!!!");
                } else {
                    console.log("Save Good");
                    resolve(this)
                }
            }, 1000)
            // setTimeout(() => {
            //     if (this.name == null || this.name == "") {
            //         console.log("Save error: NULL");
            //         reject("Value cannot be null!!!");
            //     } else {
            //         console.log("Save Good");
            //         resolve(this)
            //     }
            // }, 1000)
        })
        /*
        if (this.name == null || this.name == "") {
            console.log("Save NULL");
            return false;
            result = "Value cannot be null!!!";
        } else {
            console.log("Save Good");
            
            return true;
        }
        return false;
        */
    }

    findAuthor(searchParms){
        if (searchParms == null || searchParms == '') {
            searchParms = new RegExp();
        }
        return new Promise((resolve, reject) => {
            //console.log("search(" + searchParms.name + ") authorsList: " + JSON.stringify(authorsList.filter(value => value.name.match(searchParms.name))))
            setTimeout(() => {
                if (authorsList[0] == null || authorsList[0] == "") {
                    console.log("Find error: NULL");
                    reject("Value cannot be null!!!");
                } else {
                     //console.log("Find Good: " + authorsList[0]);
                    //return authorsList.filter(value => value.name.match(searchParms));
                    resolve(authorsList.filter(value => value.name.match(searchParms.name)))
                }
            }, 500)
        })        
        
    }
    
}


class clsAuthorItem {
    constructor(_name, _id){
        this.name = _name,
        this.id = _id;
    }
}

let authorsList = 
    [new clsAuthorItem("First Author", 1),
     new clsAuthorItem("Second Author", 2),
    ]

module.exports = authorSchema