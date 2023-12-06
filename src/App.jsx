import Register from "./Autentication/Register"
import Login from "./Autentication/Login"
import Home from "./Pages/Home"
import MyProfile from "./Pages/MyProfile"
import MarketPlace from "./Pages/MarketPlace"


import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import './App.css'
import RootLayout from "./Pages/RootLayout"

function App() {

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {path: '/', element: <Login />},
        {path: '/home', element: <Home />},
      {path: '/meuperfil/:userId', element: <MyProfile />},
      {path: '/marketplace', element: <MarketPlace />},
     
      ],
    },


        {path: '/registro', element: <Register />},

       
    
])


  return (
    <>
    <RouterProvider router={router} />
  
   
      
    </>
  )
}

export default App
