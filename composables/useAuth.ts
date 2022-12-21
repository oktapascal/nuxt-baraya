/** @format */

export const useCookieAuth = () => useCookie('access-token');

export async function useUser() {
  const authCookie = useCookieAuth().value;
  const user = useState('user');

  if (authCookie && !user.value) {
    const cookieHeaders = useRequestHeaders(['cookie']);

    const data = await $fetch('/api/auth/sessionByToken', {
      headers: cookieHeaders as HeadersInit,
    });

    const payload = {
      id: data?.id,
      kode_lokasi: data?.kode_lokasi,
    };

    user.value = payload;
  }

  return user.value;
}
