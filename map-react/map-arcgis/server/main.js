import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {MapReactArcgis} from '/imports/api/maps'
function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  Meteor.publish('maps', function() { return MapReactArcgis.find() })
});
