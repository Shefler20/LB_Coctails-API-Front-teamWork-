import type {ICocktailMutation} from "../../types";
import {createCocktail} from "../../features/cocktails/cocktailsThunks.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getLoadingCreateCocktail
} from "../../features/cocktails/cocktailsSelectors.ts";
import {Box, Typography} from "@mui/material";
import CocktailForm from "../../components/CocktailForm/CocktailForm.tsx";
import {useNavigate} from "react-router-dom";


const NewCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getLoadingCreateCocktail);


  const onCreateNewCocktail = async (newCocktail: ICocktailMutation) => {
    try {
      await dispatch(createCocktail(newCocktail)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{width: '50%', margin: '20px auto'}}>
      <Typography
        variant="h4"
        sx={{textAlign: 'center', mb: 4}}
      >
        New Cocktail
      </Typography>

      <CocktailForm
        onSubmit={onCreateNewCocktail}
        loading={loading}
      />
    </Box>
  );
};

export default NewCocktail;


