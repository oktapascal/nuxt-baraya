/** @format */

import { useUser } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();
  if (user == null && user == undefined) {
    return navigateTo('/login');
  }
});
