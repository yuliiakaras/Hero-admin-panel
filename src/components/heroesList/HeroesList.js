import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request, reqToDelete} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => {dispatch(heroesFetched(data))})
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const deleteItem = (id) => {
        reqToDelete(`http://localhost:3001/heroes/${id}`)
            .then(() => {
                dispatch(deleteHero(id))
            })

    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (!Array.isArray(arr)) {
          return <h5 className="text-center mt-5">Invalid hero list</h5>;
        }
      
        if (arr.length === 0) {
          return <h5 className="text-center mt-5">No heroes found</h5>;
        }
      
        return arr.map(({ id, ...props }) => {
          return <HeroesListItem key={id} id={id} onDelete={deleteItem} {...props} />;
        });
      };
      

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;