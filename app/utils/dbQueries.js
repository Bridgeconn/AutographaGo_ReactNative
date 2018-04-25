import DbHelper from './dbHelper';

import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'
import dbHelper from './dbHelper';

class DbQueries {
    getSomeDataFromModel() {
        return DbHelper.query('ChapterModel');
    }

    queryLanguages() {
        return DbHelper.query('LanguageModel', null, 'languageCode', false);
    }

    queryLanguageWithCode(code: string) {
        return DbHelper.query('LanguageModel', 'languageCode ==[c] "' + code + '"');
        // names.filtered('name == $0', code);
    }

    queryVersionWithCode(verCode: string, langCode: string) {
        return DbHelper.queryVersionWithCode(verCode, langCode);
    }

    queryBooksWithCode(verCode: string, langCode: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode);
    }

    queryBookWithId(bookId: string, verCode: string, langCode: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode, bookId);
    }

    querySearchBookWithName(text: string, verCode: string, langCode: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode, null, text);        
    }

    querySearchVerse(text: string, verCode: string, langCode: string) {
        // add langaugeCode, versionCode, chapterNumber, bookId in VERSE COMPINENET MODEL
        return DbHelper.queryInVerseText(verCode, langCode, text);
    }

    queryHighlights(verCode: string, langCode: string) {
        return DbHelper.queryHighlights(verCode, langCode);
    }

    // queryNotes(verCode: string, langCode: string) {
    //     RealmQuery<NotesModel> query = realm.where(NotesModel.class);
    //     query = query.equalTo("languageCode", language, Case.INSENSITIVE);
    //     return query.findAll().sort("timestamp", Sort.DESCENDING);
    // }

    // querySearchHistoryWithText(text: string) {
    //     RealmQuery<SearchHistoryModel> query = realm.where(SearchHistoryModel.class);
    //     query = query.equalTo("searchText", text, Case.INSENSITIVE);
    //     return query.findAllSorted("searchCount", Sort.DESCENDING);
    // }

    // queryNotesWithId(id: Date, verCode: string, langCode: string) {
    //     RealmQuery<NotesModel> query = realm.where(NotesModel.class);
    //     query = query.equalTo("timestamp", id);
    //     query = query.equalTo("languageCode", language, Case.INSENSITIVE);
    //     query = query.equalTo("versionCode", version, Case.INSENSITIVE);
    //     return query.findAll();
    // }

    // queryHistory(verCode: string, langCode: string) {
    //     RealmQuery<SearchModel> query = realm.where(SearchModel.class);
    //     query = query.equalTo("languageCode", language, Case.INSENSITIVE);
    //     query = query.equalTo("versionCode", version, Case.INSENSITIVE);
    //     return query.findAll().sort("timeStamp", Sort.DESCENDING);
    // }

    insert(model, value) {
        DbHelper.insert(model, value);
    }

    addNewBook(bookModel, versionModel, languageModel) {
        DbHelper.insertNewBook(bookModel, versionModel, languageModel);
    }

    updateBookWithHighlights(languageModels, verseIdModels) {
        DbHelper.updateHighlights(languageModels, verseIdModels);
    }
    // addNotes(note){
    //    return dbHelper.addNotes(note);
    // }
}

export default new DbQueries();