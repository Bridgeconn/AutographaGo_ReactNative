'use strict';

import Realm from 'realm'

export default class VersionModel extends Realm.Object {}
VersionModel.schema = {
    name: 'VersionModel',
    properties: {
    	versionName: 'string',
    	versionCode: 'string',
    	bookModels: 'BookModel[]',
    	source: 'string',
    	license: 'string',
    	year: 'int',
        versionOwner: {type: 'linkingObjects', objectType: 'LanguageModel', property: 'versionModels' }
    }
};