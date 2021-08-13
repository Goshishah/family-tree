const INITIAL_STATE = {
  selectedLang: "",
  readOnly: true,
};

const TYPE_TOGGLE_LANGUAGE = "TYPE_TOGGLE_LANGUAGE";
const TYPE_TOGGLE_READONLY = "TYPE_TOGGLE_READONLY";

//GENERAL REDUCER
const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_TOGGLE_LANGUAGE:
      return { ...state, selectedLang: action.payload };
    case TYPE_TOGGLE_READONLY:
      return { ...state, readOnly: action.payload };
    default:
      return state;
  }
};

//GENERAL ACTION

const toggleLangAction = (payload) => ({
  type: TYPE_TOGGLE_LANGUAGE,
  payload,
});

const toggleReadOnlyAction = (payload) => ({
  type: TYPE_TOGGLE_READONLY,
  payload,
});

export { toggleLangAction, toggleReadOnlyAction, generalReducer };
