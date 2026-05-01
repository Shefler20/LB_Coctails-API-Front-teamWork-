import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import {
  getDetailCocktail,
  getLoadingRatingCocktail,
} from "../../features/cocktails/cocktailsSelectors";
import { useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDetailCocktails,
  createCocktailRating,
} from "../../features/cocktails/cocktailsThunks";
import { BASE_URL, NO_IMAGE } from "../../globalConst.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Rating from '@mui/material/Rating';
import Spinner from "../../components/Spinner/Spinner";



const DetailCocktailInfo = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const detailCoctail = useAppSelector(getDetailCocktail);
    const ratingLoading = useAppSelector(getLoadingRatingCocktail);

    const [rating, setRating] = useState<number | null>(null);

    const changeRating = (newRating: number | null) => {
        if (newRating !== null && id) {
            try {
                dispatch(createCocktailRating({ id, rating: newRating })).unwrap();
            } catch(e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        if (detailCoctail) setRating(Math.floor(detailCoctail.averageRating));
    }, [detailCoctail?.averageRating])

    useEffect(() => {
        if (id) dispatch(getDetailCocktails(id));
    }, [dispatch]);

    return (
      <>
        <Grid sx={{ marginBlock: 5 }} container spacing={4}>
          <Grid size={5}>
            <Box>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                src={`${detailCoctail?.image ? BASE_URL + detailCoctail.image : NO_IMAGE}`}
              />
            </Box>
          </Grid>
          <Grid size={7}>
            <Typography variant="h3">{detailCoctail?.title}</Typography>

            <Typography variant="subtitle2" gutterBottom>
              Rating:{" "}
              {`${detailCoctail?.averageRating.toFixed(1)} (${detailCoctail?.ratingQuantity} votes)`}
            </Typography>

            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ReceiptLongOutlinedIcon color="action" />
              Ingredients:
            </Typography>

            <List>
              {detailCoctail?.ingredients.map((item, index) => (
                <ListItem sx={{ padding: 0 }} key={index}>
                  <ListItemIcon>
                    <CircleIcon sx={{ fontSize: "12px" }} color="action" />
                  </ListItemIcon>
                  <Typography color="textSecondary">
                    {item.title} - {item.quantity}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid size={8}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MenuBookIcon color="action" />
              Recipe:
            </Typography>
            <Typography sx={{ minHeight: "150px" }} variant="body1">
              {detailCoctail?.receipt}
            </Typography>

            <Box sx={{ position: "relative" }}>
              {ratingLoading && <Spinner />}
              <Typography variant="h6">Rate: </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  changeRating(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
};

export default DetailCocktailInfo;