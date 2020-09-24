import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Film } from "../../model/Film";
import * as API from "../../amplify/API";
import { request, done } from "../processing/processlingSlice";
import { error, clearError } from "../error/errorSlice";

type FilmsState = {
  films: Film[],
  page: number,
  hasNext: boolean,
  nextLoading: boolean,
}

const initialState: FilmsState = {
  films: new Array<Film>(),
  page: 1,
  hasNext: false,
  nextLoading: false,
};

type SearchPayload = Pick<FilmsState, "films" | "hasNext">;
type SearchNextPayload = Pick<FilmsState, "films" | "hasNext" | "page">;

const films = createSlice({
  name: "films",
  initialState,
  reducers: {
    requestNext(state) {
      state.nextLoading = true;
    },
    requestNextDone(state) {
      state.nextLoading = false;
    },
    search(state, action: PayloadAction<SearchPayload>) {
      state.films = action.payload.films;
      state.hasNext = action.payload.hasNext;
    },
    searchNext(state, action: PayloadAction<SearchNextPayload>) {
      state.films = state.films.concat(action.payload.films);
      state.hasNext = action.payload.hasNext;
      state.page = action.payload.page;
    },
  },
});

const {
  requestNext,
  requestNextDone,
  search,
  searchNext,
} = films.actions;

export const filmsReducer = films.reducer;

type ThunkSearchFilmsAction = ThunkAction<Promise<void>, FilmsState, undefined, Action<string>>;

export function searchFilms(title: string): ThunkSearchFilmsAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const { films, hasNext } = await API.searchByTitle(title);
      dispatch(search({ films, hasNext }));
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}

export function searchFilmsNext(title: string, nextPage: number): ThunkSearchFilmsAction {
  return async (dispatch) => {
    dispatch(requestNext());
    dispatch(clearError());
    try {
      const { films, hasNext } = await API.searchByTitle(title, nextPage);
      dispatch(searchNext({ films, hasNext, page: nextPage }));
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(requestNextDone());
    }
  };
}
