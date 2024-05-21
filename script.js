/**************************************************************/
//Login and log user data
/**************************************************************/
export let username;
export let uid;
let email;
let PFP;
var user;
//AUTH
console.log('script.js boot');
export function fb_login() {
    console.log('logging in');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
                // The signed-in user info.
                user = result.user;
                console.log(user);
            });
            console.log('user logged in');
            username = user.displayName;
            uid = user.uid;
            email = user.email;
            PFP = user.photoURL;
            console.log(uid);
            //user = result.user;
            console.log(user.uid);
        } else {
            console.log('FAIL to login')
            // Using a popup.
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
                // The signed-in user info.
                user = result.user;
                console.log(user);
            });
        }
    });
    setTimeout(() => {
        console.log('logging data in firebase');
        console.log(uid + email + username);
        firebase.database().ref('users/' + username + ' ' + uid).set({
            uid: uid,
            email: email,
            username: username,
            PFP: PFP,
        })
    }, 6000);
}