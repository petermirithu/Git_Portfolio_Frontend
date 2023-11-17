import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
 const defaultTheme = createTheme();

 return (
   <>
     <ThemeProvider theme={defaultTheme}>
       <BrowserRouter>
         <Routes>
           <Route path="/">
             <Route index element={<Home />} />             
             <Route path="signIn" element={<SignIn />} />
             <Route path="signUp" element={<SignUp />} />
           </Route>
         </Routes>
       </BrowserRouter>
     </ThemeProvider>
   </>
 )
}


export default App