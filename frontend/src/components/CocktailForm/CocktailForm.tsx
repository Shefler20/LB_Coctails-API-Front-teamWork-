import styled from "@emotion/styled";
import type {
  ICocktailMutation,
  ICocktailWithoutIngredients,
  IIngredient
} from "../../types";
import {Box, Button, Grid, TextField} from "@mui/material";
import {selectUser} from "../../features/users/usersSelectors.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {toast} from "react-toastify";
import {getAllCocktails} from "../../features/cocktails/cocktailsThunks.ts";
import FileInput from "../FileInput/FileInput.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onSubmit: (newCocktail: ICocktailMutation) => Promise<void>;
  loading: boolean;
}

const CustomTextField = styled(TextField)({
  width: "100%",
});


const CocktailForm: React.FC<Props> = ({onSubmit, loading}) => {
  const user = useAppSelector(selectUser);
  const [form, setForm] = useState<ICocktailWithoutIngredients>({
    title: "",
    receipt: "",
    image: null,
  });

  const [ingredients, setIngredients] = useState<IIngredient[]>([
    {title: "", quantity: ""}
  ]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {title: "", quantity: ""}
    ])
  }

  const deleteIngredient = (ind: number) => {
    setIngredients((prev) => prev.filter((_, index) => index !== ind));
  }

  const dispatch = useAppDispatch();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length === 0 || form.receipt.trim().length === 0 || ingredients.length === 0 || form.image === null) {
      toast.error("You need to enter title,receipt,ingredients and image.All of this is required");
      return;
    }

    if (!user) return

    await onSubmit({...form, ingredients});

    setForm({
      title: "",
      receipt: "",
      image: null,
    });
    setIngredients([
      {title: "", quantity: ""}
    ])
    await dispatch(getAllCocktails());
  };

  const handleIngredChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setIngredients((prev) => prev.map((ingredient, i) => {
      if (i === index) {
        return {
          ...ingredient,
          [name]: value
        };
      } else {
        return ingredient;
      }
    }));
  }


  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState => ({...prevState, [name]: value}));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={submitFormHandler}
      noValidate
    >
      <Grid
        container
        spacing={3}
      >
        <Grid size={12}>
          <CustomTextField
            id="cocktail-title"
            label="Title"
            value={form.title}
            onChange={inputChangeHandler}
            name="title"
            fullWidth
          />
        </Grid>

        {ingredients && ingredients.length > 0 && (
          <Grid
            container
            size={12}
            spacing={2}
          >
            {ingredients.map((ingred, index) => (
              <Grid
                container
                size={12}
                key={index}
                spacing={2}
                sx={{alignItems: "flex-start"}}

              >
                <Grid size={{xs: 6, sm: 7}}>
                  <CustomTextField
                    id={`ingred-title-${index}`}
                    label="Ingredient title"
                    value={ingred.title}
                    onChange={(e) => handleIngredChange(index, e)}
                    name="title"
                    fullWidth
                  />
                </Grid>

                <Grid size={{xs: 4, sm: 3}}>
                  <CustomTextField
                    id={`ingred-quantity-${index}`}
                    label="Amount"
                    value={ingred.quantity}
                    onChange={(e) => handleIngredChange(index, e)}
                    name="quantity"
                    fullWidth
                  />
                </Grid>

                {index !== 0 && (
                  <Grid
                    size={{xs: 2, sm: 2}}
                    sx={{display: 'flex', mt: 1}}
                  >
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteIngredient(index)}>
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}

            <Grid size={12}>
              <Button variant="contained" endIcon={<SendIcon />} onClick={addIngredient}>
                Add ingredient
              </Button>
            </Grid>
          </Grid>
        )}

        <Grid size={12}>
          <CustomTextField
            multiline
            rows={4}
            id="receipt"
            label="Receipt"
            value={form.receipt}
            onChange={inputChangeHandler}
            name="receipt"
            fullWidth
          />
        </Grid>

        <Grid size={12}>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid
          size={12}
          sx={{display: 'flex', justifyContent: 'flex-end', mt: 1}}
        >
          <Button
            loading={loading}
            loadingPosition="end"
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Create cocktail
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
};

export default CocktailForm;