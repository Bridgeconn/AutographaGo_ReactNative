import DbHelper from './dbHelper';

class DbQueries {

    getSomeDataFromModel() {
        let results = DbHelper.query('ChapterModel');
        return results;
    }

    addNewChapter(value) {
        DbHelper.insert('ChapterModel', value);
    }

    addNewBook(value) {
        DbHelper.insert('BookModel', value);
    }

    getLinks() {
        DbHelper.queryLinks();
    }

    addSpecificLinking() {
        DbHelper.insertSpecificLinking();
    }

}

export default new DbQueries();