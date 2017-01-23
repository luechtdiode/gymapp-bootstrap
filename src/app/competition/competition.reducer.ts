import {Action} from '@ngrx/store';
import {Competition} from '../model/backend-typings';
import * as competition from './competition.actions';

export interface CompetitionsState {
  loaded: boolean;
  loading: boolean;
  competitions: Competition[];
  loadingFeatured: boolean;
  featured: Competition;
};

const initialState: CompetitionsState = {
  loaded: false,
  loading: false,
  competitions: [],

  loadingFeatured: false,
  featured: undefined,
};

export function reducer(state = initialState, action: Action): CompetitionsState {
  switch (action.type) {
    case competition.ActionTypes.LOAD_COMPETITIONS:
    {
      return Object.assign({}, state, {
        loading: true,
        loaded: state.loaded,
        competitions: state.competitions,
        loadingFeatured: state.loadingFeatured,
        featured: state.featured,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.ActionTypes.LOAD_COMPETITIONS_SUCCESS:
    {
      const cs: Competition[] = action.payload;
      return {
        loaded: true,
        loading: false,
        competitions: [...cs].sort((comp1, comp2): number => {
          return comp2.dates[0].getDate() - comp1.dates[0].getDate();
        }),
        loadingFeatured: state.loadingFeatured,
        featured: state.featured,
      };
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.ActionTypes.LOAD_FEATURED_COMPETITION:
    {
      return {
        loaded: state.loaded,
        loading: state.loading,
        competitions: state.competitions,
        loadingFeatured: true,
        featured: undefined,
      };
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.ActionTypes.LOAD_FEATURED_COMPETITION_SUCCESS:
    {
      return {
        loaded: state.loaded,
        loading: state.loading,
        competitions: state.competitions,
        loadingFeatured: false,
        featured: action.payload,
      };
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.ActionTypes.SAVE_COMPETITION_SUCCESS:
    case competition.ActionTypes.DELETE_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        loading: true,
        loaded: state.loaded,
        competitions: [
          ...state.competitions.filter(comp => comp._id !== action.payload._id),
          action.payload
        ].sort((comp1, comp2): number => {
          return comp2.dates[0].getDate() - comp1.dates[0].getDate();
        }),
        featured: state.featured,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.ActionTypes.DELETE_COMPETITION_SUCCESS:
    case competition.ActionTypes.SAVE_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.competitions.filter(comp => comp._id !== comp._id),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    default:
    {
      return state;
    }
  }
}

export const getCompetitions = (state: CompetitionsState) => state.competitions;

export const getIds = (state: CompetitionsState) => getCompetitions(state).map(c => c._id);

export const isLoaded = (state: CompetitionsState) => state.loaded;
export const isLoading = (state: CompetitionsState) => state.loading;

export const getFeatured = (state: CompetitionsState) => state.featured;
export const isLoadingFeatured = (state: CompetitionsState) => state.loadingFeatured;
