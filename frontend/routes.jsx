import React from 'react'
import { useRoutes } from 'react-router-dom'
import Auth from './src/layout/Auth'
import Login from './src/pages/Login'
import SignUp from './src/pages/SignUp'
import Main from './src/layout/Main'
import Home from './src/pages/Home'
import Sources from './src/pages/Sources'
import MostSources from './src/pages/MostSources'
import LoginHistory from './src/pages/LoginHistory'
import MostSourcesArticles from './src/pages/MostSourcesArticles'


export default function Router() {
    const routes = useRoutes([
        {
            element: <Auth />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <SignUp  />
                }
            ],
            
        },
        {
            element: <Main/>,
            children: [
                {
                    element: <Home />,
                    path: '/'
                },
                {
                    element: <Sources />,
                    path: 'sources'
                },
                {
                    element: <MostSources />,
                    path: 'most-sources'
                },
                {
                    element: <LoginHistory />,
                    path: 'login-history'
                },
                {
                    element:<MostSourcesArticles />,
                    path:'most-sources-articles'
                }
            ]
        }
        
    ])

    return routes
}
