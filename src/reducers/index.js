const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter(hero => hero.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_HERO':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? 
                                state.heroes : 
                                state.heroes.filter(hero => hero.element === action.payload)
            }
        case 'DELETE_HERO':
            const updatedHeros = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: updatedHeros,
                filteredHeroes: state.activeFilter === 'all' ?
                                updatedHeros :
                                updatedHeros.filter(hero => hero.element === state.activeFilter)
            }
        case 'ADD_HERO':
            const newList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newList,
                filteredHeroes: state.activeFilter === 'all' ? 
                                newList :
                                newList.filter(hero => hero.element === state.activeFilter)
            }
        
        default: return state
    }
}

export default reducer;