import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    getListOfCocktails,
    getLoadingAllCocktails,
    getLoadingDeleteCocktail, getLoadingPublicateCocktail
} from "../../features/cocktails/cocktailsSelectors.ts";
import {selectUser} from "../../features/users/usersSelectors.ts";
import {useEffect} from "react";
import {deleteCocktail, getAllAdminCocktails, publicateCocktail} from "../../features/cocktails/cocktailsThunks.ts";
import {Box, LinearProgress, Typography} from "@mui/material";
import CardCocktail from "../../components/CardCocktail/CardCocktail.tsx";


const AdminPageCocktails = () => {
    const dispatch = useAppDispatch();
    const allCocktails = useAppSelector(getListOfCocktails);
    const loading = useAppSelector(getLoadingAllCocktails);
    const user = useAppSelector(selectUser);
    const deleteCocktailLoading = useAppSelector(getLoadingDeleteCocktail);
    const togglePublishedCocktailLoading = useAppSelector(getLoadingPublicateCocktail);

    useEffect(() => {
        dispatch(getAllAdminCocktails());
    }, [dispatch]);

    const published = async (id: string) => {
        await dispatch(publicateCocktail(id));
        await dispatch(getAllAdminCocktails());
    };

    const onDelete = async (id: string) => {
        await dispatch(deleteCocktail(id));
        await dispatch(getAllAdminCocktails());
    };

    return (
        <>
            {deleteCocktailLoading || togglePublishedCocktailLoading && <LinearProgress/>}
            {!loading && allCocktails.length === 0 && <Typography variant="h6" sx={{mt:3, textAlign: "center"}}>No Cocktails yet</Typography>}
            {loading && (<LinearProgress />)}
            {!loading && allCocktails.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mt: 4, flexWrap: "wrap" }}>
                    {allCocktails.map((c) => (
                        <CardCocktail
                            key={c._id}
                            cocktail={c}
                            isOwner={!!user}
                            isAdmin={user?.role === "admin"}
                            published={published}
                            onDelete={onDelete}
                            showStatus={!!user}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

export default AdminPageCocktails;