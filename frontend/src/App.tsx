import './App.css'
import Header from "./components/Header/Header.tsx";
import {Container} from "@mui/material";
import { Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import PageNotFound from "./containers/PageNotFound/PageNotFound.tsx";
import Login from "./containers/Login/Login.tsx";
import Register from "./containers/Register/Register.tsx";
import NewCocktail from "./containers/NewCocktail/NewCocktail.tsx";
import DetailCocktailInfo from "./containers/DetailCocktailInfo/DetailCocktailInfo.tsx";
import MyCocktail from "./containers/MyCocktail/MyCocktail.tsx";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminPageCocktails from "./containers/AdminPageCocktails/AdminPageCocktails";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import { selectUser } from './features/users/usersSelectors.ts';
import { useAppSelector } from './app/hooks.ts';

const App = () => {
    const user = useAppSelector(selectUser);
    return (
      <>
        <Header user={user} />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cocktails/new"
              element={
                <PrivateRoute>
                  <NewCocktail />
                </PrivateRoute>
              }
            />
            <Route
              path="/cocktails/my"
              element={
                <PrivateRoute>
                  <MyCocktail />
                </PrivateRoute>
              }
            />
            <Route path="cocktail/:id" element={<DetailCocktailInfo />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminPageCocktails />} />
              <Route path="cocktails" element={<AdminPageCocktails />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </>
    );}

export default App
