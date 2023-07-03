export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}
export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: id
    }
}
export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero
    }
}
export const filterHero = (element) => {
    return {
        type: 'FILTER_HERO',
        payload: element
    }
}