import Realm from 'realm'

export default class HistoryModel extends Realm.Object {}
HistoryModel.schema = {
    name: 'HistoryModel',
    properties: {
    	languageCode: 'string',
    	versionCode: 'string',
        bookId: 'string',
        chapterNumber:'int',
        time:'date'
    }
};