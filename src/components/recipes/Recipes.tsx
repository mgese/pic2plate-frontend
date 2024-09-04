import React, { ReactElement, useMemo } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionGroup,
} from '@chayns-components/core';
import Recipe from '../shared/recipe/Recipe';
import { useAppSelector } from '../../hooks/redux';
import { selectRecipes } from '../../redux-modules/recipes/selectors';

const Recipes = () => {
    const recipes = useAppSelector(selectRecipes);

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        recipes.forEach(({ recipe, title, id }) => {
            items.push(
                <Recipe
                    recipe={recipe}
                    title={title}
                    id={id}
                    key={`recipe-${id}`}
                />
            );
        });

        return items;
    }, [recipes]);

    return useMemo(
        () => (
            <Accordion
                title="Generierte Rezepte"
                isDefaultOpen
                key="recipes"
                isDisabled={recipes.length === 0}
            >
                <AccordionContent>
                    Hier findest du eine Sammlung von Rezepten, die mithilfe
                    einer Künstlichen Intelligenz generiert wurden. Bitte
                    beachte, dass diese Rezepte automatisch erstellt wurden und
                    daher gelegentlich Fehler enthalten oder ungenaue Angaben
                    haben können. Sie sind als Inspiration gedacht und sollten
                    vor dem Nachkochen überprüft und nach persönlichem Geschmack
                    angepasst werden.
                </AccordionContent>
                <AccordionGroup>{content}</AccordionGroup>
            </Accordion>
        ),
        [content, recipes.length]
    );
};

Recipes.displayNAme = 'Recipes';

export default Recipes;
