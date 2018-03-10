import DbHelper from './dbHelper';

class DbQueries {

    getSomeDataFromModel() {
        let results = DbHelper.query('ChapterItem');
        return results;
    }

    addNewChapter(value) {
        DbHelper.insert('ChapterItem', value);
    }

    addNewBook(value) {
        DbHelper.insert('BookItem', value);
    }

}

export default new DbQueries();