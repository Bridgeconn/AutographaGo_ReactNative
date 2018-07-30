// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import { Notification } from 'react-native-firebase';

export default async (message) => {
    // handle your message
    console.log('on Background Message');
    console.log(message);
    let newNotification;

    if (Platform.OS === 'android') {
        newNotification = new firebase.notifications.Notification()
            .setNotificationId(message.messageId)
            .setTitle(message.data.title)
            .setBody(message.data.body)
            .setSound('default')
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId('alert');
    }

    return firebase.notifications().displayNotification(newNotification);
    return Promise.resolve();
}