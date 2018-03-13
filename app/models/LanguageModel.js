'use strict';

import Realm from 'realm'

export default class LanguageModel extends Realm.Object {}
LanguageModel.schema = {
    name: 'LanguageModel',
    primaryKey: 'languageCode',
    properties: {
    	languageCode: 'string',
    	languageName: 'string',
    	versionModels: 'VersionModel[]'
    }
};