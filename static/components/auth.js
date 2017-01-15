const db = firebase.database().ref("items");
const user = firebase.auth().currentUser;

var auth = {
    isLoggedIn: () => {
        if (user) {
            return true;
        } else {
            return false;
        }
    }
};

export default auth;
