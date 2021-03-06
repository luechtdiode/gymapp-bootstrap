/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { UrlProvider } from '../shared/urlProvider';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { Observable, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const urlProviderStub = {
    activeLocation: () => {},
    originHRef: {},
  };
  const authProviderStub = {
    
  };
  const storeStub: Store<AppState> = <Store<AppState>> {
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return of(false);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: UrlProvider, useValue: urlProviderStub },
          { provide: AuthService, useValue: authProviderStub },
          { provide: Store, useValue: storeStub },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
