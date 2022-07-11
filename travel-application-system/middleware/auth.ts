export default defineNuxtRouteMiddleware((to, from) => {
    const userInfo = useCookie('userInfo')
    console.log(userInfo.value)

    if (userInfo.value == undefined) {
        return '/login'
    } else {
        console.log(typeof(userInfo.value))
        let user = userInfo.value;
        if (user.role == 'admin') {
            return '/admin'
        } else {
            return '/user'
        }
    }
})