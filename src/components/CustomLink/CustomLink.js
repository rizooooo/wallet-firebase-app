import React from 'react'
import { Route } from 'react-router-dom'

const CustomLink = ({ active, children, to }) => {
    return (
        <Route
            path={to}
            exact={active}
            children={({ match }) => (
                <div className={match && match}>
                    {children}
                </div>
            )}
        />
    )
}

export default CustomLink
