import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {BASE_URL} from "../../../globalConst.ts";
import type { User } from "../../../types";
import { logout } from "../../../features/users/usersThunks.ts";
import { useAppDispatch } from "../../../app/hooks.ts";


interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClick2 = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        console.log("logout");
    };
    return (
        <>
            <Button variant="text" onClick={handleClick2} color="inherit">
                Add
            </Button>
            <Menu
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <MenuItem component={NavLink} to={"/cocktails/new"}>Cocktail</MenuItem>
            </Menu>
            <Button
                variant="outlined"
                onClick={handleClick}
                color="inherit"
                startIcon={
                    <Avatar
                        src={user.avatar ? BASE_URL + user.avatar : undefined}
                        alt={user.displayName || user.email}
                    >
                        {(user.displayName || user.email)?.[0].toUpperCase()}
                    </Avatar>
                }
            >
                {user.displayName || user.email}!
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem component={NavLink} to={"/cocktails/my"}>My Cocktails</MenuItem>
                {user && user.role === "admin" &&  <MenuItem component={NavLink} to={"/admin"}>Admin</MenuItem>}
            </Menu>
        </>
    );
};

export default UserMenu;