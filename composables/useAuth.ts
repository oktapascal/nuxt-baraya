/** @format */

import { use } from 'h3';

export const useCookieAuth = () => useCookie('access-token');

export async function useUser() {
  const authCookie = useCookieAuth().value;
  const user = useState('user');

  if (authCookie && !user.value) {
    const cookieHeaders = useRequestHeaders(['cookie']);

    const { data } = await useFetch('/api/auth/sessionByToken', {
      headers: cookieHeaders as HeadersInit,
    });

    user.value = data.value;
  }

  return user.value;
}
