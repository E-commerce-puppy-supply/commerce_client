import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { RenderMenu } from './RenderNavigation'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import { useFilter } from '../Context/FilterContext'

const NavBar = () => {

    const { filter, setfilter } = useFilter();

    const handleFilter = (e) => {
        return setfilter(e.target.value);
    }

    console.log(filter)

    return (
        <AppBar position='sticky' >
            <Toolbar>
                {/* use for icons */}
                <Typography sx={{ flexGrow: 1 }}>
                    My Store
                </Typography>
                <input type='text'
                    placeholder='fun...'
                    onChange={handleFilter} />
                <Stack direction='row' >
                    <RenderMenu />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar; 