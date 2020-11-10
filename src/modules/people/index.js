import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'

const PeopleManagement = () => {
    return (
        <Switch>
            {routes.map(r => <Route key={r.path} exact path={r.path} component={r.component} />)}
            <Route render={() => <Redirect to="/not-found" />} />
        </Switch>
    )
}

export default PeopleManagement
