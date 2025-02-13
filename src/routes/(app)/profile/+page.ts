import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';

console.log("Running +page.ts")

export const load = async () => {
  if (!auth.currentUser) {
    console.log("User is not logged in!");
    throw redirect(302, '/login');
  }

  return {
    user: auth.currentUser
  };
};