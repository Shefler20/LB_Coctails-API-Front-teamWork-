import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import UserMenu from "./UserMenu/UserMenu.tsx";
import AnonymousMenu from "./AnonimusMenu/AnonymousMenu.tsx";
import * as React from "react";
import type {User} from "../../types";

interface Props {
    user: User | null;
}

const Header: React.FC<Props>= ({user}) => {
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "grey.700" }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{px:0}}>
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            <NavLink
                                to='/'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >Cocktails App</NavLink>
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;