import React from 'react';
import { List, View, Create } from './screens';
// import { List, Create, Edit } from "./screens"

// const ListMerchantTypes = React.lazy(() => import('./screens/list'));
// const CreateMerchantType = React.lazy(() => import('./screens/create'));
// const EditMerchantType = React.lazy(() => import('./screens/edit'));



export const ROUTE_PATH = {
    LIST_PEOPLE: '/people',
    VIEW_PEOPLE: '/people/:id',
    CREATE_PERSON: '/people/create'
}

const routes = [
    { 
        path: ROUTE_PATH.CREATE_PERSON,
        exact: true,
        component: Create 
    },
    { 
        path: ROUTE_PATH.LIST_PEOPLE,
        exact: true,
        component: List 
    },
    { 
        path: ROUTE_PATH.VIEW_PEOPLE,
        exact: true,
        component: View 
    },

]

export default routes;