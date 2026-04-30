import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useNavigate} from "react-router-dom";
import FileInput from "../../UI/FileInput.tsx";
import * as React from "react";
import {GoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";


const Register = () => {
    // ошибки при регистрации отлов через селектор
    // загрузка при регистрации
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterMutation>({
        email: "",
        password: "",
        avatar: null,
        displayName: "",
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value }));
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // запрос на отправку формы регистрации
            setForm({
                email: "",
                password: "",
                avatar: null,
                displayName: "",
            });
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    const getFieldError = (fieldError: string) => {
        try {
            // отлов ошибок
        }catch {
            return undefined;
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files){
            setForm(prevState => ({...prevState, [name]: files[0]}));
        }
    };

    const googleLoginHandler = async (credential: string) => {
        // логин через гугл
        navigate("/");
    };
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 12}}>
                                <TextField
                                    autoComplete="given-name"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoFocus
                                    value={form.email}
                                    onChange={onInputChange}
                                    error={Boolean(getFieldError("email"))}
                                    helperText={getFieldError("email")}
                                 /*   disabled={loadingRegister}*/
                                />
                            </Grid>
                            <Grid size={{xs: 12}}>
                                <TextField
                                    autoComplete="given-name"
                                    name="displayName"
                                    required
                                    fullWidth
                                    id="displayName"
                                    label="Your name of the user"
                                    autoFocus
                                    value={form.displayName}
                                    onChange={onInputChange}
                                    error={Boolean(getFieldError("displayName"))}
                                    helperText={getFieldError("displayName")}
                                 /*   disabled={loadingRegister}*/
                                />
                            </Grid>
                            <Grid size={{xs: 12}}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={onInputChange}
                                    error={Boolean(getFieldError("password"))}
                                    helperText={getFieldError("password")}
                                  /*  disabled={loadingRegister}*/
                                />
                            </Grid>
                            <Grid size={{xs: 12}}>
                                <FileInput name="avatar" label="Avatar" value={form.avatar} onChange={fileInputChangeHandler}/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                            {/*{loadingRegister ? <CircularProgress/> : "Sign Up"}*/}
                        </Button>
                        <Box sx={{py:2}}>
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    if (credentialResponse.credential) {
                                        googleLoginHandler(credentialResponse.credential);
                                    }
                                }}
                                onError={() => toast.error('Google Login failed.')}
                            />
                        </Box>
                        <Grid container sx={{justifyContent: 'flex-end'}}>
                            <Grid>
                                <Link to='/login'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;