'use strict';

import Realm from 'realm'
// import { ListView } from 'realm/react-native'

export default class BookItem extends Realm.Object {}
BookItem.schema = {
    name: 'BookItem',
    primaryKey: 'bookId',
    properties: {
      bookId: 'string',
      bookName: 'string',
      bookNumber: 'int',
      section: {type: 'string', default: 'NT'},
      chapterItems: {type: 'list', objectType: 'ChapterItem'},
      bookmarks: 'int?[]',
    },
};

// export default new Realm({schema: [BookItem]});

// export const bookItemDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

// export const getBookItems = () => {
//   const bookItems = BookItem.get().sorted('bookNumber', true)
//   return bookItems
// }

// export const getBookItem = (id) => {
//   const bookItem = realm.objectForPrimaryKey(BookItem, id)
//   return bookItem
// }

// export const updateBookItem = (bookItem, value, completed) => {
//   realm.write(() => {
//     try {
//       bookItem.value = value
//       bookItem.completed = completed
//     } catch (e) {
//       console.warn(e)
//     }
//   })
// }

// export const createBookItem = (value) => {
//   realm.write(() => {
//     realm.create(BookItem.schema.name, {
//       value
//     })
//   })
// }

// export const deleteBookItem = (bookItem) => {
//   realm.write(() => {
//     realm.delete(bookItem)
//   })
// }

// const realm = new Realm({schema: [BookItem]})