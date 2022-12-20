export default defineNuxtRouteMiddleware((to, from) => {
    const accessTokenCookie = useCookie('access-token')
    const refreshTokenCookie = useCookie('refresh-token')

    if(typeof accessTokenCookie.value === 'undefined') {
        return navigateTo('/login')
    }

    if(typeof refreshTokenCookie.value === 'undefined') {
        return navigateTo('/login')
    }
});