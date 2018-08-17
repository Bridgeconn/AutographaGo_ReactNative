import DbHelper from './dbHelper';

import LanguageModel from '../models/LanguageModel'
import VersionModel from '../models/VersionModel'
import BookModel from '../models/BookModel'
import ChapterModel from '../models/ChapterModel'
import VerseComponentsModel from '../models/VerseComponentsModel'
import NoteModel from '../models/NoteModel';

class DbQueries {

    queryLanguages() {
        return DbHelper.query('LanguageModel', null, 'languageName', false);
    }

    queryLanguageWithCode(code: string) {
        return DbHelper.query('LanguageModel', 'languageCode ==[c] "' + code + '"');
    }

    queryVersionWithCode(verCode: string, langCode: string) {
        return DbHelper.queryVersionWithCode(verCode, langCode);
    }

    queryBooks(verCode: string, langCode: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode);
    }

    queryBookWithId(verCode: string, langCode: string,bookId: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode, bookId);
    }

    querySearchBookWithName(verCode: string, langCode: string, text: string) {
        return DbHelper.queryBooksWithCode(verCode, langCode, null, text);        
    }

    querySearchVerse(verCode: string, langCode: string, text: string) {
        return DbHelper.queryInVerseText(verCode, langCode, text);
    }

    queryHighlights(verCode: string, langCode: string) {
        return DbHelper.queryHighlights(verCode, langCode);
    }

    updateHighlightsInBook(model, chapterIndex, verseIndex, isHighlight) {
        return DbHelper.updateHighlightsInBook(model, chapterIndex, verseIndex, isHighlight)
    }

    insert(model, value) {
        DbHelper.insert(model, value);
    }

    addNewBook(bookModel, versionModel, languageModel) {
        DbHelper.insertNewBook(bookModel, versionModel, languageModel);
    }

    updateHighlightsInVerse(langCode, verCode, bookId, chapterNumber, verseNumber, isHighlight) {
        DbHelper.updateHighlightsInVerse(langCode, verCode, bookId, chapterNumber, verseNumber, isHighlight);
    }

    updateBookmarkInBook(model, chapterNumber, isBookmark) {
        DbHelper.updateBookmarkInBook(model, chapterNumber, isBookmark);
    }

    removeBookmarkFromBook(model, chapterNumber) {
        DbHelper.removeBookmarkFromBook(model, chapterNumber);
    }

    queryBookIdModels(verCode: string, langCode: string) {
        return DbHelper.queryBookIdModels(verCode, langCode);
    }

    queryNotes() {
       return DbHelper.queryNotes();
    }

    addOrUpdateNote(index, body, createdTime, modifiedTime, refList){
        return DbHelper.addOrUpdateNote(index, body, createdTime, modifiedTime, refList);
    }
    notesCharStyle(charIndex){
         DbHelper.notesCharStyle(charIndex)
    }
    
    deleteNote(time){
        DbHelper.deleteNote(time);
    }

    addHistory(langCode, verCode, bookId, chapterNumber, time) {
        DbHelper.addHistory(langCode, verCode, bookId, chapterNumber, time)
    }

    queryHistory(){
        return DbHelper.queryHistory();
    }

    clearHistory(){
        DbHelper.clearHistory()
    }

    deleteLanguage(lanCode, verCode){
        DbHelper.deleteLanguage(lanCode, verCode)
    }

    queryVersions() {
        return DbHelper.query('VersionModel');
    }
}

export default new DbQueries();