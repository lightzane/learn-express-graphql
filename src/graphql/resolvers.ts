import { GROCERY_LIST } from "../shared/data/grocery-list";

export const resolvers = {
    Query: {
        hello: () => 'Hello World',
        groceryList: () => GROCERY_LIST
    },
    Mutation: {
        // the "_" is the parent resolver, and 2nd parameter are the "args"
        // -- Hint: use ES6 Destructuring assignment for the "args"
        addGrocery: (_, { item }): string[] => {
            GROCERY_LIST.push(item);
            return GROCERY_LIST;
        }
    }
};