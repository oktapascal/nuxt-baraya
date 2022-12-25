/** @format */

export const useCookieAuth = () => useCookie('access-token');

export async function useUser() {
  const authCookie = useCookieAuth().value;
  const user = useState('user');

  if (authCookie && user.value == undefined) {
    const cookieHeaders = useRequestHeaders(['cookie']);

    const data = await $fetch('/api/userRoleLocation', {
      headers: cookieHeaders as HeadersInit,
    });

    const payload = {
        role: data?.role,
        kode_lokasi: data?.kode_lokasi
    };

    user.value = payload;
  }

  return user.value;
}
