import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './../src/components/pages/404'
import { Error } from './../src/components/pages/error'
import { Dashboard } from './components/pages/app/dashboard/dashboard'
import { Orders } from './components/pages/app/orders/orders'
import { SignIn } from './components/pages/auth/sign-in'
import { SignUp } from './components/pages/auth/sign-up'
import { AppLayout } from './components/pages/layouts/app'
import { AuthLayout } from './components/pages/layouts/auth'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/', element: <Dashboard />
            }
            , {
                path: '/orders', element: <Orders />
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [

            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> }

        ]
    },
    {
        path: '*',
        element: <NotFound />

    }
])