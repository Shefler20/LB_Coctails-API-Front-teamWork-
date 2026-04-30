import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getListOfCocktails, getLoadingAllCocktails} from "../../features/cocktails/cocktailsSelectors.ts";
import {selectUser} from "../../features/users/usersSelectors.ts";
import {useEffect} from "react";
import {getAllCocktails} from "../../features/cocktails/cocktailsThunks.ts";
import {Box, LinearProgress, Typography} from "@mui/material";
import CardCocktail from "../../components/CardCocktail/CardCocktail.tsx";

const MyCocktail = () => {
    const dispatch = useAppDispatch();
    const myCocktails = useAppSelector(getListOfCocktails);
    const loading = useAppSelector(getLoadingAllCocktails);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (user) dispatch(getAllCocktails(user._id));
    }, [dispatch, user]);

    const isOwner = (userId: string) => {
        return user?._id === userId;
    };
    return (
        <>
            {myCocktails.length === 0 && <Typography variant="h6" sx={{mt:3, textAlign: "center"}}>No my Cocktails yet</Typography>}
            {loading && (<LinearProgress />)}
            {!loading && myCocktails.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mt: 4, flexWrap: "wrap" }}>
                    {myCocktails.map((c) => (
                        <CardCocktail
                            key={c._id}
                            cocktail={c}
                            isOwner={isOwner(c.user)}
                            showStatus={!!user}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

export default MyCocktail;