/** @format */

import { useUser } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.fullPath === '/') {
    const user = await useUser();

    if (user == null && user == undefined) {
      return '/login';
    }

    return '/dashboard';
  }
});
