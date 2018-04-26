'use strict';

import Realm from 'realm'

export default class StylingModel extends Realm.Object {}
StylingModel.schema = {
    name: 'StylingModel',
    properties: {
        characterIndex:'int',

        format: 'int[]',

        bold: {type: 'bool', default: false},
        italics: {type: 'bool', default: false},
        underline: {type: 'bool', default: false},
    }
};