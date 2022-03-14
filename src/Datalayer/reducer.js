export const initialState = {
  searchShow: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COVID_DATA":
      return {
        ...state,
        covidData: action.covidData,
      };
    case "SET_SEARCH_SHOW":
      return {
        ...state,
        searchShow: action.searchShow,
      };
    case "SET_SEARCH_RES":
      return {
        ...state,
        searchRes: action.searchRes,
      };
    case "SET_SEARCH_CLICKED":
      return {
        ...state,
        searchClicked: action.searchClicked,
      };

    default:
      return state;
  }
};

export default reducer;
