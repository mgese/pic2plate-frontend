import React, { ReactElement, useMemo } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionGroup,
    Icon,
} from '@chayns-components/core';
import Recipe from '../shared/recipe/Recipe';
import { useAppSelector } from '../../hooks/redux';
import { selectFavouriteRecipes } from '../../redux-modules/recipes/selectors';

const FavouriteRecipes = () => {
    const recipes = useAppSelector(selectFavouriteRecipes);

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        recipes.forEach(({ recipe, title, id }) => {
            items.push(
                <Recipe
                    recipe={recipe}
                    title={title}
                    id={id}
                    key={`fav-recipe-${id}`}
                />
            );
        });

        return items;
    }, [recipes]);

    const rightElement = useMemo(
        () => (
            <Icon
                icons={[`fas fa-bookmark`]}
                size={20}
                color="var(--chayns-color--yellow-2)"
            />
        ),
        []
    );

    return useMemo(
        () => (
            <Accordion
                title="Gespeicherte Rezepte"
                rightElement={rightElement}
                key="fav-recipes"
                isDisabled={recipes.length === 0}
            >
                <AccordionContent>
                    Hier siehst du eine Liste von Rezepten, die du gespeichert
                    hast. Diese Rezepte wurden von dir ausgewählt und können
                    jederzeit wieder aufgerufen werden. Sie bieten dir eine
                    praktische Möglichkeit, deine Lieblingsgerichte zu
                    organisieren und schnell darauf zuzugreifen.
                </AccordionContent>
                <AccordionGroup>{content}</AccordionGroup>
            </Accordion>
        ),
        [content, recipes.length, rightElement]
    );
};

FavouriteRecipes.displayNAme = 'FavouriteRecipes';

export default FavouriteRecipes;
