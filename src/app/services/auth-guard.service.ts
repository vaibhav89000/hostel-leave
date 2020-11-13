import { Injectable } from '@angular/core';
import {AuthserviceService} from './authservice.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import {map, tap, take, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
    private authenticationService: AuthserviceService,
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.userISAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if(!isAuthenticated){
          return this.authenticationService.autoLogin();
        }else{
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if(!isAuthenticated){
          this.router.navigate(['login-admin']);
        }
      }))

}
}
