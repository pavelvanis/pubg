import { createBrowserRouter } from 'react-router-dom'

//import { DefaultLayout, Error } from './layouts'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import Main from './layouts/Main/Main'
import Error from './layouts/Error/Error'
import PlayerLayout from './layouts/player/PlayerLayout'
import StatsLayout from './layouts/Stats/StatsLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: 'player',
                element: <PlayerLayout />
            },
            {
                path: 'stats',
                element: <StatsLayout />
            }
        ]
    },
    {
        path: '*',
        element: <Error />
    }
])

export default router