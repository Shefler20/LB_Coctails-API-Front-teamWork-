import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import type { ICocktail } from "../../types";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL, NO_IMAGE } from "../../globalConst.ts";

interface Props {
    cocktail: ICocktail;
    isOwner: boolean;
    isAdmin: boolean;
    showStatus?: boolean;
    onDelete?: (id: string) => void;
    published?: (id: string) => void;
}

const CardCocktail: React.FC<Props> = ({cocktail, isOwner, isAdmin, showStatus = false, onDelete, published}) => {
    return (
        <Card
            component={NavLink}
            to={`/cocktail/${cocktail._id}`}
            sx={{
                position: "relative",
                width: 200,
                height: 280,
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                },
            }}
        >
            {isAdmin && showStatus && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        zIndex: 2,
                    }}
                >
                    <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete?.(cocktail._id);
                        }}
                    >
                        Delete
                    </Button>

                    <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            published?.(cocktail._id);
                        }}
                    >
                        {cocktail.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                </Box>
            )}

            <CardActionArea
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardMedia
                    component="img"
                    image={
                        cocktail.image
                            ? BASE_URL + cocktail.image
                            : NO_IMAGE
                    }
                    alt={cocktail.title}
                    sx={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                    }}
                />

                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                        }}
                    >
                        {cocktail.title}
                    </Typography>

                    {isOwner && showStatus && !cocktail.isPublished && (
                        <Typography
                            variant="caption"
                            color="error"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Not published
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardCocktail;