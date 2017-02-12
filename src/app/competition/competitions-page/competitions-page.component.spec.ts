/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { reducer } from '../../app-state.reducer';
import { Observable } from 'rxjs/Observable';

import { CompetitionsPageComponent } from './competitions-page.component';
import { CompetitionListComponent } from '../competition-list/competition-list.component';
import { CompetitionMediaComponent } from '../competition-media/competition-media.component';
import { Competition } from '../../model/backend-typings';

describe('CompetitionsPageComponent', () => {
  let component: CompetitionsPageComponent;
  let fixture: ComponentFixture<CompetitionsPageComponent>;
  const competitionListStub: Competition[] = [
    <Competition>{
      _id: 'testId',
      name: 'TestCompetition',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'KuTu',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      description: 'Testdescription',
      website: 'www.testcompetition.gym',
    }
  ];

  const storeStub: Store<AppState> = <Store<AppState>> {
        select: (selector: any, ...paths: string[]) => {
          console.log('selecting ', selector);
          return Observable.of(competitionListStub);
        },
        dispatch: (action: Action) => {
          console.log('dispatching ', action);
        }
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionsPageComponent, CompetitionListComponent, CompetitionMediaComponent ],
      providers: [
        {provide: Store, useValue: storeStub}
      ],
      imports: [
        StoreModule.provideStore({reducer})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
