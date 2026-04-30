import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getListOfCocktails, getLoadingAllCocktails} from "../../features/cocktails/cocktailsSelectors.ts";
import {selectUser} from "../../features/users/usersSelectors.ts";
import CardCocktail from "../../components/CardCocktail/CardCocktail.tsx";
import {useEffect} from "react";
import {getAllCocktails} from "../../features/cocktails/cocktailsThunks.ts";
import {Box, LinearProgress, Typography} from "@mui/material";

const Home = () => {
    const dispatch = useAppDispatch();
    const allCocktails = useAppSelector(getListOfCocktails);
    const loading = useAppSelector(getLoadingAllCocktails);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(getAllCocktails());
    }, [dispatch]);

    return (
        <>
            {allCocktails.length === 0 && <Typography variant="h6" sx={{mt:3, textAlign: "center"}}>No Cocktails yet</Typography>}
            {loading && (<LinearProgress />)}
            {!loading && allCocktails.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mt: 4, flexWrap: "wrap" }}>
                    {allCocktails.map((c) => (
                        <CardCocktail
                            key={c._id}
                            cocktail={c}
                            isOwner={!!user}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

export default Home;