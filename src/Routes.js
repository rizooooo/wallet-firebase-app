import React, { useContext } from 'react';
import Global from './modules/common/context';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import AuthLayout from './layouts/Auth';
import SignInView from './modules/sign-in';
import Dashboard from './modules/dashboard';
import UserDashboardLayout from './layouts/UserDashboard';
import PeopleManagement from './modules/people';
import SignUpView from './modules/sign-up';

const PrivateRoute = props => {
    const { layout: Layout, component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={matchProps =>
                true ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
                        <Redirect
                            to={{
                                pathname: '/'
                            }}
                        />
                    )
            }
        />
    );
}

const Routes = () => {
    const { currentUser = null } = useContext(Global.AuthContext)
    console.log(currentUser, '@CURRENT USER');
    const PrivateRoute = props => {
        const { layout: Layout, component: Component, ...rest } = props;
        return (
            <Route
                {...rest}
                render={matchProps =>
                    currentUser ? (
                        <Layout>
                            <Component {...matchProps} />
                        </Layout>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/'
                                }}
                            />
                        )
                }
            />
        );
    }
    return (
        <Switch>
            <RouteWithLayout
                component={SignInView}
                exact
                layout={AuthLayout}
                path="/"
            />
             <RouteWithLayout
                component={SignUpView}
                exact
                layout={AuthLayout}
                path="/sign-up"
            />
            <PrivateRoute
                component={Dashboard}
                exact
                layout={UserDashboardLayout}
                path="/dashboard"
            />
            <PrivateRoute
                component={PeopleManagement}
                layout={UserDashboardLayout}
                path="/people"
            />
        </Switch>
    )
}

const RouteController = () => {
    return (
        <Global.AuthProvider>
            <Routes />
        </Global.AuthProvider>
    )
}

export default RouteController;