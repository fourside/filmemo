import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { UserActionTypes, SearchFilmsActionTypes, ACTIONS, SearchFilmsNextActionTypes, SearchTitleInputActionTypes } from "../actions/types";
import { emptyUser } from "../model/User";
import { Film } from "../model/Film";

const userReducer = (state = emptyUser, action: UserActionTypes) => {
  switch(action.type) {
    case ACTIONS.SIGN_IN_REQUEST:
      return state;
    case ACTIONS.SIGN_IN_SUCCESS:
      return action.payload;
    case ACTIONS.SIGN_OUT_REQUEST:
    case ACTIONS.SIGNED_OUT:
      return action.payload;
    default:
      return state;
  }
};

const initFilmsState = {
  processing: false,
  films: [] as Film[],
  page: 1,
  hasNext: false,
  nextLoading: false,
  error: "",
};
const filmsReducer = (state = initFilmsState, action: SearchFilmsActionTypes | SearchFilmsNextActionTypes) => {
  switch(action.type) {
    case ACTIONS.SEARCH_FILMS_REQUEST:
    case ACTIONS.SEARCH_FILMS_SUCCESS:
    case ACTIONS.SEARCH_FILMS_FAILURE:
    case ACTIONS.SEARCH_FILMS_NEXT_REQUEST:
    case ACTIONS.SEARCH_FILMS_NEXT_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SEARCH_FILMS_NEXT_SUCCESS:
      const total = state.films.concat(action.payload.films);
      return {
        ...state,
        ...action.payload,
        films: total,
      };
    default:
      return state;
  }
};

const titleReducer = (state = "", action: SearchTitleInputActionTypes) => {
  switch(action.type) {
    case ACTIONS.SEARCH_TITLE_INPUT:
      return action.payload.title;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
  title: titleReducer,
});

type RootState = ReturnType<typeof rootReducer>

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUser = () => useTypedSelector(state => state.user);
export const useFilms = () => useTypedSelector(state => state.films);
export const useTitle = () => useTypedSelector(state => state.title);
