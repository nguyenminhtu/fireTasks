import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/operator/first';
import 'rxjs/add/operator/map';
import {FirebaseService} from "./firebase.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private firebaseService: FirebaseService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.firebaseService.isAuthenticated();
    }
}