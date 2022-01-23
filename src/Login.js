import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { supabase } from './client';

export default function Login({
    setLogin, setIsLoading, exitApp, farsi
}) {
    const [google, setGoogle] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const user = supabase.auth.user();

    const handleGoogleLogin = () => {
        setGoogle(true);
        setSignUp(false);
        setSignIn(false);
    };
    // login with google api
    const googleLogin = async (email) => {
        console.log("google login");
        try {
            setLogin(false);
            setIsLoading(true);
            let { error } = await supabase.auth.signIn({ email })
            if (error) throw error;

        } catch (error) {
            console.log(error);

        } finally {

            setIsLoading(false);
        }
    };

    const handleSignIn = () => {
        setSignIn(true);
        setGoogle(false);
        setSignUp(false);
    };

    // sign in api
    const signInApp = async (email, password) => {
        console.log("sign in");
        try {
            setIsLoading(true);
            let { error } = await supabase.auth.signIn({ email, password })
            if (error) throw error;

        } catch (error) {
            console.log(error);

        } finally {
            setLogin(false);
            setIsLoading(false);
        }
    };

    const handleSignUp = () => {
        setSignUp(true);
        setSignIn(false);
        setGoogle(false);
    };

    // sign up api
    const signUpApp = async (email, password) => {
        console.log("sign up");
        try {
            setIsLoading(true);
            let { error } = await supabase.auth.signUp({ email, password })
            if (error) throw error;

        } catch (error) {
            console.log(error);

        } finally {
            setLogin(false);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setGoogle(false);
        setSignIn(false);
        setSignUp(false);
    };

    return (
        <div className='loginItems'>
            <Button className='login-btn sign-in' variant="outlined" onClick={() => handleSignIn(email)}>
                {farsi ? "ورود" : "sign in"}
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-person-lines-fill"
                    viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
            </Button>
            <Button className='login-btn sign-up' variant="outlined" onClick={() => handleSignUp(email)}>
                {farsi ? "ثبت نام" : "sign up"}
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-person-plus-fill"
                    viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
            </Button>
            <Button className='login-btn sign-google' variant="outlined" onClick={() => handleGoogleLogin(email)}>
                {farsi ? "ورود با حساب گوگل" : "login with google"}
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
            </Button>
            <Button className='login-btn exit-btn' variant="outlined" onClick={() => {
                exitApp();
                setLogin(false);
            }}>
                {farsi ? "خروج از برنامه" : "exit app"}
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
            </Button>

            {/* sign in */}
            <Dialog sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: "50%"
            }}
                open={signIn} onClose={handleClose}>
                <DialogTitle>sign in with email and password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {farsi && `برای ورود به حساب کاربری خود و اختصاصی کردن لیست کارها، ایمیل و پسورد خود را وارد کنید`}
                        {!farsi && `To sing in to your dashboard,
                         please enter your email address and your password here.`}

                    </DialogContentText>
                    <TextField

                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={signInApp}>sign in</Button>
                </DialogActions>
            </Dialog>

            {/* sign up */}
            <Dialog sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: "50%"
            }}
                open={signUp} onClose={handleClose}>
                <DialogTitle>sign up to application</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {farsi && `برای ثبت نام در این اپلیکیشن، لطفا ایمیل و پسورد خود را وارد کنید. 
                        در این صورت میتوانید لیست کارها را بذای خود شخصی سازی کنید.`}
                        {!farsi && `To sign up to this applications,
                        please enter your email address and password here.
                        َThen you will be able to specialize tasks for yourself.`}
                    </DialogContentText>
                    <TextField

                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={signUpApp}>sign up</Button>
                </DialogActions>
            </Dialog>

            {/* login with google account */}
            <Dialog sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: "50%"
            }}
                open={google} onClose={handleClose}>
                <DialogTitle>Login with your Google account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {farsi && `برای ورود به این برنامه و شخصی سازی لیست کارها، ایمیل خود را وارد کنید.
                        ما برای شما لینک دعوتنامه را ارسال خواهیم کرد.`}
                        {!farsi && `To login to this application and specialize your tasks,
                        please enter your email address here.
                        We will send you an invitation email.`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={googleLogin}>login</Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}
