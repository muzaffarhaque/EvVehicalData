import './App.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard, Home, RootLayout} from './pages';
import { ToastContainer } from 'react-toastify';
import { ErrorPage } from './components';
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            errorElement: <ErrorPage/>,
            children:[
                {
                    path: "/",
                    element: <Dashboard/>,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard/>,
                },
            ]
        }
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
