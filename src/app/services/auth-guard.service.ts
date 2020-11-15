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
    const expectedRole = route.data.role;
    // console.log(this.router.url);
    // console.log('expected',expectedRole);
    return this.authenticationService.userISAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        
        if(!isAuthenticated){
          return this.authenticationService.autoLogin();
        }else{
          return of(isAuthenticated);
        }
      }),
      switchMap((Userlive)=>{
        if(Userlive === true){

          return this.authenticationService.Rolecheck(expectedRole).pipe(
            take(1),
            switchMap(role => {
              if(role === true){
                return of(true);
              }
              else{
                // if(expectedRole === 'Admin'){
                //   this.router.navigate(['student-dashboard']);
                // }
                // else{
                //   this.router.navigate(['users']);
                // }
                return of(false);
              }
            })
          )
        }
        else{
          this.router.navigate(['admin/login-admin']);
          return of(false);
        }
      }),
      tap(isAuthenticated => {
        // if(!isAuthenticated){
        //   this.router.navigate(['login-admin']);
        // }
        console.log('i am in tap');
      }))

}
}
