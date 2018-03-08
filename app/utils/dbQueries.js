import DbHelper from './dbHelper';

class DbQueries {

    /* a typical query */
    getSomeDataFromModelA(){//filterValue: string = null) {
        // let filter = null;
        // if (filterValue) {
        //     filter = `two = ${filterValue}`;
        // }
        // let realm = await DbHelper.getRealm();
        // if (realm) {
            let results = DbHelper.query('ChapterItem');//, filter);
            return results;
        // }
        // return null;
    }

    addNewChapter(chapterNumber, numberOfVerses) {
        console.log("here in db queries, add new")
        // let realm = await DbHelper.getRealm();
        // if (realm) {
        //     console.log("realm opened, no insert")
        DbHelper.insert('ChapterItem', chapterNumber, numberOfVerses);
        // } else {
        //     console.log("realm open failed")
        // }
    }

}

export default new DbQueries();
