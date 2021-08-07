const INITIAL_STATE = {
  selectedLang: "en",
};

const TYPE_TOGGLE_LANGUAGE = "TYPE_TOGGLE_LANGUAGE";

//GENERAL REDUCER
const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_TOGGLE_LANGUAGE:
      return { ...state, selectedLang: action.payload };
    default:
      return state;
  }
};

//GENERAL ACTION

const toggleLangAction = (payload) => ({
  type: TYPE_TOGGLE_LANGUAGE,
  payload,
});

export { toggleLangAction, generalReducer };
