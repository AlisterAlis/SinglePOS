
// const authorSchema = {
//     "name": "First Author",
// };
//const { FileIndex } = require("git");

class bookSchema {
    constructor(_title, _description, _publishDate, _pageCount, _authorID){
        this.title = _title,
        this.description = _description,
        this.publishDate = _publishDate,
        this.pageCount = _pageCount,
        this.createdAt = Date.now,
        this.authorID = _authorID
    }

    Save(){
        return new Promise((resolve, reject) => {

            bookList.push(new clsBookItem(
                this.title,
                this.description,
                this.publishDate.toISOString().split('T')[0],
                this.pageCount,
                this.authorID
                ))

            console.log(JSON.stringify(bookList))
            setTimeout(() => {
                if (bookList[0] == null || bookList[0] == "") {
                    console.log("Save error: NULL");
                    reject("Value cannot be null!!!");
                } else {
                    console.log("Save Good");
                    resolve(this)
                }
            }, 1000)
        })
    }

    findBook(searchParms){
        return new Promise((resolve, reject) => {
            //console.log("search(" + searchParms.name + ") authorsList: " + JSON.stringify(authorsList.filter(value => value.name.match(searchParms.name))))
            setTimeout(() => {
                if (bookList[0] == null || bookList[0] == "") {
                    console.log("Booklist empty error: NULL");
                    reject("Booklist Value cannot be null!!!");
                } else {
                     //console.log("Find Good: " + authorsList[0]);
                    //return authorsList.filter(value => value.name.match(searchParms));
                    try {
                        console.log("publishDate: " + bookList[0].publishDate + "    publishedBefore: " + searchParms.publishBeforeDate);
                        
                        //let results = bookList.filter(value => value.title.match(searchParms.title) && value.publishDate < searchParms.publishBeforeDate)
                        let results = bookList.filter(value => value.title.match(searchParms.title))

                        if (searchParms.publishBeforeDate != null && searchParms.publishBeforeDate != '') {
                            results = bookList.filter(value => new Date(value.publishDate) <  new Date(searchParms.publishBeforeDate))
                            console.log("Filter Before Date");
                        }

                        if (searchParms.publishAfterDate != null && searchParms.publishAfterDate != '') {
                            results = bookList.filter(value => new Date(value.publishDate) >  new Date(searchParms.publishAfterDate))
                            console.log("Filter After Date");
                        }

                        //results = results.filter()

                        resolve(results)
                    } catch (error) {
                        reject('Error in Books Search: ' + error)
                    }
                }
            }, 1000)
        })        
        
    }
    
}


class clsBookItem {
    constructor(_title, _description, _publishDate, _pageCount, _authorID){
        this.title = _title,
        this.description = _description,
        this.publishDate = _publishDate,
        this.pageCount = _pageCount,
        this.createdAt = Date.now,
        this.authorID = _authorID
        ;
    }
}

let bookList = 
    [new clsBookItem("First Book", "Desc1", new Date("2015-12-01"), 1, 1),
     new clsBookItem("Second Book", "Desc2", new Date("1815-12-01"), 2, 2),
    ]

module.exports = bookSchema