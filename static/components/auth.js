const db = firebase.database().ref("items");
const fbauth = firebase.auth();

var auth = {
    isLoggedIn: () => {
        var user = fbauth.currentUser
        if (user) {
            return true;
        } else {
            return false;
        }
    }
};

export default auth;
