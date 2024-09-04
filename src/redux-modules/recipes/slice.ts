import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/Recipe';
import recipes from '../../components/recipes/Recipes';

interface RecipeState {
    recipes: IRecipe[];
    favouriteRecipes: IRecipe[];
}

const initialState: RecipeState = {
    recipes: [
        {
            title: 'Pancakes',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>200g Mehl</li>
                <li>2 EL Zucker</li>
                <li>1 TL Backpulver</li>
                <li>1 Prise Salz</li>
                <li>300ml Milch</li>
                <li>1 Ei</li>
                <li>50g Butter, geschmolzen</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Mehl, Zucker, Backpulver und Salz in einer Schüssel mischen.</li>
                <li>Milch, Ei und geschmolzene Butter hinzufügen und zu einem glatten Teig verrühren.</li>
                <li>Eine Pfanne erhitzen und den Teig portionsweise hineingeben.</li>
                <li>Pancakes von beiden Seiten goldbraun braten und mit Ahornsirup servieren.</li>
            </ol>
        `,
            id: 4,
        },
        {
            title: 'Caesar Salad',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>2 Hähnchenbrustfilets</li>
                <li>1 Kopf Römersalat</li>
                <li>50g Parmesan</li>
                <li>100g Croutons</li>
                <li>Caesar-Dressing</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Hähnchenbrust grillen oder braten und in Scheiben schneiden.</li>
                <li>Römersalat waschen und in mundgerechte Stücke zupfen.</li>
                <li>Salat in einer Schüssel mit Parmesan, Croutons und Caesar-Dressing vermengen.</li>
                <li>Hähnchen auf den Salat legen und servieren.</li>
            </ol>
        `,
            id: 5,
        },
        {
            title: 'Chili con Carne',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>500g Hackfleisch</li>
                <li>1 Zwiebel</li>
                <li>2 Knoblauchzehen</li>
                <li>1 rote Paprika</li>
                <li>400g Tomaten (gewürfelt)</li>
                <li>400g Kidneybohnen</li>
                <li>1 EL Chilipulver</li>
                <li>1 TL Kreuzkümmel</li>
                <li>Salz und Pfeffer</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Hackfleisch in einem großen Topf anbraten, bis es krümelig ist.</li>
                <li>Zwiebeln und Knoblauch hinzufügen und mitdünsten.</li>
                <li>Paprika, Tomaten, Kidneybohnen, Chilipulver und Kreuzkümmel hinzufügen.</li>
                <li>Alles gut vermengen und etwa 30 Minuten köcheln lassen.</li>
                <li>Mit Salz und Pfeffer abschmecken und servieren.</li>
            </ol>
        `,
            id: 6,
        },
    ],
    favouriteRecipes: [
        {
            title: 'Spaghetti Carbonara',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>200g Spaghetti</li>
                <li>100g Pancetta</li>
                <li>2 Eier</li>
                <li>50g Parmesan</li>
                <li>Salz und Pfeffer</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Spaghetti nach Packungsanweisung kochen.</li>
                <li>Pancetta in einer Pfanne knusprig anbraten.</li>
                <li>Eier und geriebenen Parmesan in einer Schüssel verquirlen.</li>
                <li>Heiße, abgetropfte Spaghetti in die Pfanne geben, Eiermischung hinzufügen und gut umrühren.</li>
                <li>Mit Pfeffer abschmecken und sofort servieren.</li>
            </ol>
        `,
            id: 1,
        },
        {
            title: 'Tomatensuppe',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>500g Tomaten</li>
                <li>1 Zwiebel</li>
                <li>2 Knoblauchzehen</li>
                <li>500ml Gemüsebrühe</li>
                <li>Salz, Pfeffer und frisches Basilikum</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Zwiebeln und Knoblauch in einem Topf anbraten, bis sie weich sind.</li>
                <li>Tomaten hinzufügen und etwa 10 Minuten köcheln lassen.</li>
                <li>Mit Gemüsebrühe auffüllen und weitere 10 Minuten kochen lassen.</li>
                <li>Alles mit einem Stabmixer pürieren und mit Salz, Pfeffer und frischem Basilikum abschmecken.</li>
            </ol>
        `,
            id: 2,
        },
        {
            title: 'Hähnchen Curry',
            recipe: `
            <h2>Zutaten</h2>
            <ul>
                <li>500g Hähnchenbrust</li>
                <li>1 Zwiebel</li>
                <li>2 Knoblauchzehen</li>
                <li>1 Stück Ingwer (2 cm)</li>
                <li>2 EL Currypaste</li>
                <li>400ml Kokosmilch</li>
                <li>Salz und Pfeffer</li>
            </ul>
            <h2>Durchführung</h2>
            <ol>
                <li>Hähnchen in mundgerechte Stücke schneiden und anbraten.</li>
                <li>Zwiebeln, Knoblauch und Ingwer hinzufügen und glasig dünsten.</li>
                <li>Currypaste einrühren und kurz mitbraten.</li>
                <li>Kokosmilch hinzufügen und das Curry etwa 20 Minuten köcheln lassen.</li>
                <li>Mit Salz und Pfeffer abschmecken und mit Reis servieren.</li>
            </ol>
        `,
            id: 3,
        },
    ],
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        addRecipes(state, { payload }: PayloadAction<IRecipe[]>) {
            state.recipes = [...state.recipes, ...payload];
        },
        addFavouriteRecipes(state, { payload }: PayloadAction<IRecipe[]>) {
            state.favouriteRecipes = [...state.favouriteRecipes, ...payload];
        },
        addFavouriteRecipe(state, { payload }: PayloadAction<IRecipe>) {
            if (
                !state.favouriteRecipes.some(
                    (recipe) => recipe.id === payload.id
                )
            ) {
                state.favouriteRecipes.push(payload);
            }
        },
        removeFavouriteRecipe(state, { payload }: PayloadAction<number>) {
            state.favouriteRecipes = state.favouriteRecipes.filter(
                (recipe) => recipe.id !== payload
            );
        },
        updateRecipe(
            state,
            { payload }: PayloadAction<{ oldId: number; newId: number }>
        ) {
            const { oldId, newId } = payload;

            state.favouriteRecipes = state.favouriteRecipes.map((recipe) => {
                if (recipe.id === oldId) {
                    return { ...recipe, id: newId };
                }
                return recipe;
            });

            state.recipes = state.recipes.map((recipe) => {
                if (recipe.id === oldId) {
                    return { ...recipe, id: newId };
                }
                return recipe;
            });
        },
    },
});

export const {
    addRecipes,
    updateRecipe,
    addFavouriteRecipe,
    addFavouriteRecipes,
    removeFavouriteRecipe,
} = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
