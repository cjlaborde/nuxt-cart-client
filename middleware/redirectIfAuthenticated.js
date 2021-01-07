// When user tries to go to http://localhost:3000/auth/signin and they already logged in
// redirect them to index page
export default function ({ app, redirect, route }) {
    // from app we can check the $auth module and check if we are logged in
    // if logged in
    if (app.$auth.loggedIn) {
        return redirect({
            name: 'index',
        })
    }
}