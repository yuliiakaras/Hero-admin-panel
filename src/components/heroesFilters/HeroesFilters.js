import { useEffect } from 'react';
import {filterHero} from '../../actions';

import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => {dispatch(filtersFetched(data))})
            .catch(() => dispatch(filtersFetchingError()))
    // eslint-disable-next-line        
    }, [])

    if(filtersLoadingStatus === 'loading') {
        return <Spinner />
    }

    if(filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt5">Loading error</h5>
    }

    const renderFilters = (arr) => {
        if(arr.length === 0) {
            return <h5 className="text-center mt-5">There is no filters</h5>
        }
        

        return arr.map(({name, label, className}) => {
            const btnClasses = classNames('btn', className, {
                'active' : name === activeFilter
            });
            return <button onClick={() => dispatch(filterHero(name))} key={name} className={btnClasses} value={name}>{label}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;