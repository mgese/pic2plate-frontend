import React, { useEffect } from 'react';
import { AccordionGroup } from '@chayns-components/core';
import FileUpload from './file-upload/FileUpload';
import FavouriteRecipes from './favourite-recipes/FavouriteRecipes';
import Recipes from './recipes/Recipes';
import { useAppDispatch } from '../hooks/redux';
import { loadFavouriteRecipes } from '../redux-modules/recipes/actions';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadFavouriteRecipes());
    }, [dispatch]);

    return (
        <div>
            <FileUpload />
            <AccordionGroup>
                <FavouriteRecipes />
                <Recipes />
            </AccordionGroup>
        </div>
    );
};

export default App;
