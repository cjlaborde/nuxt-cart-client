// We can access app, redirect and route information
export default function ({ app, redirect, route }) {
    // from app we can check the $auth module and check if we are logged in 
    if (!app.$auth.loggedIn) {
        return redirect({
            name: 'auth-signin',
            // redirect user with query parameter
            query: {
                // redirect will have full path of the page they were trying to access before
                // but could not since they were logged out.
                redirect: route.fullPath
            }
        })
    }
}