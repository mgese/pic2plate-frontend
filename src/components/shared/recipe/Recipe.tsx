import React, { ReactNode, useCallback, useMemo } from 'react';
import { Accordion, AccordionContent, Icon } from '@chayns-components/core';
import { IRecipe } from '../../../types/Recipe';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectIsRecipeFavourite } from '../../../redux-modules/recipes/selectors';
import {
    addRecipe,
    removeRecipe,
} from '../../../redux-modules/recipes/actions';

const Recipe = ({ recipe, title, id }: IRecipe) => {
    const dispatch = useAppDispatch();
    const isFavourite = useAppSelector(selectIsRecipeFavourite(id));

    const handleIconClick = useCallback(() => {
        if (isFavourite) {
            void dispatch(removeRecipe(id));
        } else {
            void dispatch(addRecipe({ recipe, title, id }));
        }
    }, [dispatch, id, isFavourite, recipe, title]);

    const rightElement: ReactNode = useMemo(
        () => (
            <Icon
                icons={[`${isFavourite ? 'fas' : 'far'} fa-star`]}
                size={20}
                onClick={handleIconClick}
                color={
                    isFavourite
                        ? 'var(--chayns-color--yellow-2)'
                        : 'var(--chayns-color--headline-1)'
                }
            />
        ),
        [handleIconClick, isFavourite]
    );

    return useMemo(
        () => (
            <Accordion
                title={title}
                rightElement={rightElement}
                key={`recipe-${id}`}
            >
                <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: recipe }} />
                </AccordionContent>
            </Accordion>
        ),
        [id, recipe, rightElement, title]
    );
};

Recipe.displayName = 'Recipe';

export default Recipe;
