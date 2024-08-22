import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Layout } from './pages/Profile/layout'
import { Profile } from './pages/Profile/Dashboard'
import { Photos } from './pages/Profile/photos'
import { Settings } from './pages/Settings'
import { UpdateLogin } from './pages/Settings/update'
import { VisibilityProvider } from './context/VisibilityContext'

const routes = createBrowserRouter([
  {
    path: '',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Profile />
      },
      {
        path: "/profile/albums",
        element: <Photos />
      },
      {
        path: "/profile/settings",
        element: <Settings />
      },
      {
        path: "/profile/settings/update",
        element: <UpdateLogin />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisibilityProvider>
      <RouterProvider router={routes}>
      </RouterProvider>
    </VisibilityProvider>
  </StrictMode>,
)
