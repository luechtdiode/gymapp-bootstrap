import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';

@Injectable()
export class IsSponsorUserGuardGuard implements CanActivate {
  sponsorid: Observable<string>;

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sponsorid.map((id: string) => !!id);
  }

  constructor(private store: Store<AppState>) {
    this.sponsorid = this.store.select(fromRoot.isMemberOfSponsor);
  }
}
