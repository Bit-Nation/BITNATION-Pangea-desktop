import * as React from 'react';
import {
    AppBar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Button,
    Divider,
    List,
    Toolbar,
    Drawer,
    CssBaseline,
    ListItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useMenuState from './use-menu-state';
import { DRAWER_WIDTH, SPACING_PAPER } from '../../utils/style';
import { IChatProps, IChatStates } from './interface';
import { IRoomType } from '../../types/room';
import Loading from '../common/loading';
import Notifier from '../common/notifier';
import useNotifierState from './use-notifier-state';

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * SPACING_PAPER,
    },
});

const LinkToHome = props => <Link to="/" {...props} />;

const Chat = (
    {
        user,
        chat: { rooms, room, isFetching, message },
        classes,
        logout,
        setRoom,
        joinRoom,
    }: IChatProps,
    {  }: IChatStates,
) => {
    const { openMenu, anchorEl, handleCloseMenu, handleOpenMenu } = useMenuState(false, undefined);
    const { isOpenNotifier, onCloseNotifier, onOpenNotifier } = useNotifierState(false);
    React.useEffect(
        () => {
            if (message !== undefined && !isOpenNotifier) {
                onOpenNotifier();
            }
        },
        [message],
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Chat
                    </Typography>
                </Toolbar>
                <div>
                    <IconButton
                        aria-owns={openMenu ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleOpenMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Close</MenuItem>
                    </Menu>
                </div>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <Typography variant="h6" color="inherit" gutterBottom>
                    Rooms
                </Typography>
                <List>
                    {rooms.map((item: IRoomType) => (
                        <ListItem
                            key={item.room_id}
                            button
                            onClick={() => {
                                setRoom(item);
                            }}
                        >
                            {item.name}
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Button variant="contained" color="primary" component={LinkToHome}>
                    Home
                </Button>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {room ? (
                    <div>
                        <Typography variant="h6" gutterBottom>
                            <Badge color="secondary" badgeContent={room.num_joined_members}>
                                {room.name}
                            </Badge>
                        </Typography>
                        <Typography paragraph gutterBottom noWrap>
                            {room.topic}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                joinRoom(room);
                            }}
                        >
                            Join to room
                        </Button>
                    </div>
                ) : (
                    <Typography color="textPrimary" variant="h6" gutterBottom>
                        Please select an room
                    </Typography>
                )}
            </main>
            <Notifier open={isOpenNotifier} handleClose={onCloseNotifier} message={message} />
            <Loading isLoading={isFetching} />
        </div>
    );
};

export default withStyles(styles)(Chat);
