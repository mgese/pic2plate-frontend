import React, { ReactElement, useMemo } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionGroup,
    Icon,
    SmallWaitCursor,
} from '@chayns-components/core';
import Recipe from '../shared/recipe/Recipe';
import { useAppSelector } from '../../hooks/redux';
import {
    selectLoadingState,
    selectRecipes,
} from '../../redux-modules/recipes/selectors';

const Recipes = () => {
    const recipes = useAppSelector(selectRecipes);
    const loadingState = useAppSelector(selectLoadingState);

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

    const rightElement = useMemo(
        () => <Icon icons={[`fas fa-utensils`]} size={20} />,
        []
    );

    return useMemo(
        () => (
            <Accordion
                title="Generierte Rezepte"
                isDefaultOpen
                key="recipes"
                rightElement={rightElement}
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
                <AccordionContent>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SmallWaitCursor
                            shouldHideWaitCursor={[
                                'NONE',
                                'ERROR',
                                'SUCCESS',
                            ].includes(loadingState)}
                        />
                    </div>
                    {loadingState === 'ERROR' && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            Beim Generieren der Gerichte ist ein Fehler
                            aufgetreten.
                        </div>
                    )}
                </AccordionContent>
            </Accordion>
        ),
        [content, loadingState, rightElement]
    );
};

Recipes.displayNAme = 'Recipes';

export default Recipes;
