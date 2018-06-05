import id_name_map from '../assets/mappings.json'

export function getBookNameFromMapping(bookId) {
        var obj = id_name_map.id_name_map;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key == bookId) {
                    var val = obj[key];
                    return val.book_name;
                }
            }
        }
        return null;
  }
  
  export function getBookNumberFromMapping(bookId) {
    var obj = id_name_map.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key == bookId) {
                var val = obj[key];
                return val.number;
            }
        }
    }
    return null;
}