import { TestBed, inject, async } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { Action } from '../model/backend-typings';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

describe('ActionsService', () => {
  const actionsStub: Action[] = [
    <Action>{
      _id: 'testId',
      name: 'action-name',
    },
  ];

  const crudStub = <CrudService>{
    unsave: () => crudStub,
    get: () => Observable.of(actionsStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActionsService, useValue: new ActionsService(crudStub)},
      ],
    })
    .compileComponents();
  }));

  it('should be instatiatable', inject([ActionsService], (service: ActionsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load Actions', inject([ActionsService], (service: ActionsService) => {
    expect(service.loadActions()).toEqual(Observable.of(actionsStub));
  }));
});
