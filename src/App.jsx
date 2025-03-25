import './App.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard, Home, RootLayout} from './pages';
import { ToastContainer } from 'react-toastify';
import { ErrorPage } from './components';
import { useEffect } from 'react';
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

    useEffect(() => {
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var safariVersionMatch = navigator.userAgent.match(/Version\/(\d+)\.(\d+)/);14.1
      console.log(safariVersionMatch)
        if (isSafari && safariVersionMatch) {
            var majorVersion = parseInt(safariVersionMatch[1], 10); 14
            var minorVersion = parseInt(safariVersionMatch[2], 10); 1
      
            var isOldSafari = (majorVersion < 14) || (majorVersion === 14 && minorVersion < 2);
            console.log(majorVersion, minorVersion, isOldSafari,'Browser Version')
            if (isOldSafari) {
                document.body.classList.add("safari_version_less_14_2");
            } else {
                console.log("This browser Not Safari || Safari 14.2+");
            }
        }
    }, [])
   
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
