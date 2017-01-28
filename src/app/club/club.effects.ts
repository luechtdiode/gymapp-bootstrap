import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { ClubService } from './club.service';
import { ActionTypes,
  loadFeaturedAction,
  loadFeaturedSuccessAction,
  loadFeaturedFailedAction,
  loadAllSuccessAction,
  loadAllAction,
  saveSuccessAction,
  saveFailedAction,
  deleteSuccessAction,
  deleteFailedAction } from './club.actions';
import { go } from '@ngrx/router-store';

@Injectable()
export class ClubEffects {

  @Effect()
  loadFeaturedClub = this.actions$
    .ofType(ActionTypes.LOAD_FEATURED_CLUB)
    .mergeMap(() => this.compService.getFeaturedClub())
    .map(clubs => loadFeaturedSuccessAction(clubs))
    .catch((err) => {
      console.log(err);
      return Observable.of(loadFeaturedFailedAction());
    });
  @Effect()
  loadClubs = this.actions$
    .ofType(ActionTypes.LOAD_CLUBS)
    .mergeMap(() => this.compService.getClubs())
    .map(clubs => loadAllSuccessAction(clubs));

  @Effect()
  saveClub = this.actions$
    .ofType(ActionTypes.SAVE_CLUB)
    .map(action => action.payload)
    .mergeMap(club => this.compService.saveClub(club)
      .map(savedClub => saveSuccessAction(savedClub))
      .catch(() => Observable.of(
        saveFailedAction(club)
      ))
    );

  @Effect()
  saveClubSuccess = this.actions$
    .ofType(ActionTypes.SAVE_CLUB_SUCCESS)
    .map(action => action.payload)
    .do(club => {
      go(['/clubs/', {routeParam: club._id}]);
    }).filter(() => false);

  @Effect()
  deleteClub = this.actions$
    .ofType(ActionTypes.DELETE_CLUB)
    .map(action => action.payload)
    .mergeMap(comp => this.compService.deleteClub(comp._id)
      .mapTo(deleteSuccessAction(comp))
      .catch(() => Observable.of(
        deleteFailedAction(comp)
      ))
    );

  constructor(private actions$: Actions,
              private compService: ClubService) {
  }

}