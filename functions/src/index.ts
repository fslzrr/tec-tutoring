import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    response.send("Hello from Firebase!");
  }
);


exports.createProfile = functions.auth.user().onCreate((user, context) => {
  const userEmail = user.email
  // defaults to "student"
  var userType = "student"
  // defaults to ms since epoch
  var userDisplayName = Date.now().toString()
  // defaults to "biblio"
  var location = "biblio"


  if (userEmail && userEmail.charAt(0).toUpperCase() == 'L') {
    userType = "professor"
    userDisplayName = userEmail.split('@')[0]
  }

  return admin
    .firestore()
    .collection('userProfiles')
    .doc(user.uid)
    .set({
      email: user.email,
      displayName: userDisplayName,
      type: userType,
      location: location, // nasty hotfix, adds location to every type of user instead of professors only
    }).then(writeResult => {
      console.log("Created new user with display name: \"" + userDisplayName + "\"!")
    });
});
