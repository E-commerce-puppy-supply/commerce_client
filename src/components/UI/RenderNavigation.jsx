import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { nav } from './navigation.jsx'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Container, Stack } from '@mui/material';
import { useUser } from '../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';






const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const RenderRoutes = () => {
    const { state } = useUser();

    return (
        <>
            <Routes>
                {nav.map((r, i) => {
                    if (r.isPrivate && state.LoggedIn) {
                        return <Route key={i} path={r.path} element={r.element} />
                    }
                    else if (!r.isPrivate) {
                        return <Route key={i} path={r.path} element={r.element} />
                    }
                })}
            </Routes>
        </>
    )
}

export const RenderMenu = () => {
    const { state, dispatch } = useUser();

    const MenuItem = ({ r }) => {
        if (r.name === "Cart") return (
            <Link to={r.path}>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={state.cart.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </Link>)
        return <Link to={r.path}>{r.name}</Link>
    }
    return (

        <Box>
            <Container>
                <Stack direction="row" spacing={2} alignItems="center">
                    {nav.map((r, i) => {
                        if (!r.isPrivate && r.isMenu) {
                            return <MenuItem key={i} r={r} />
                        } else if (state.LoggedIn && r.isMenu) {
                            return <MenuItem key={i} r={r} />
                        }
                    })}

                    {state.LoggedIn ? <Link to="/login"
                        onClick={() => {
                            dispatch({
                                type: "logOut"
                            })
                            localStorage.removeItem("Token");
                        }
                        }
                    >Log out</Link> : <Link to="/login">Log In</Link>}
                </Stack>
            </Container>
        </Box>
    )
}

