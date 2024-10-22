import { CanActivateFn, Router } from '@angular/router';
import { authState, Auth } from "@angular/fire/auth";
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  let router = inject(Router);

  try {
    let auth = inject(Auth);
    await auth.authStateReady();
    if (auth.currentUser) {
      return true;
    }
    router.navigateByUrl("/login", {
      replaceUrl: true
    });
    return false;
  } catch(e) {
    console.log("error on auth guard");
    
    console.log(e);
    localStorage.clear();
    router.navigateByUrl("/login", {
      replaceUrl: true
    });
    return false;
  }
};
