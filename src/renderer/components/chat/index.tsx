import * as React from 'react';
import {
    AppBar,
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
import * as sdk from 'matrix-js-sdk';

import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useMenuState from './use-menu-state';
import { DEFAULT_HS_URL } from '../../utils/config';
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

const prepareJoinedRooms = (rooms: any): any => {
    rooms.sort((a, b) => {
        // < 0 = a comes first (lower index) - we want high indexes = newer
        const aMsg = a.timeline[a.timeline.length - 1];
        if (!aMsg) {
            return -1;
        }
        const bMsg = b.timeline[b.timeline.length - 1];
        if (!bMsg) {
            return 1;
        }
        if (aMsg.getTs() > bMsg.getTs()) {
            return 1;
        }
        if (aMsg.getTs() < bMsg.getTs()) {
            return -1;
        }

        return 0;
    });
    const joinedRooms = rooms.map(room => {
        const objectMembers = room.currentState.getMembers();
        const members = objectMembers.map(member => {
            if (!member.membership) {
                return undefined;
            }
            return {
                name: member.name,
                userId: member.userId,
                membership: member.membership,
            };
        });
        const { name, roomId } = room;
        return {
            name,
            roomId,
            members,
        };
    });
    return joinedRooms;
};
const Chat = (
    {
        user: {
            user: { user_id, access_token },
        },
        chat: { rooms, room, isFetching, message, joinedRooms },
        classes,
        logout,
        setRoom,
        joinRoom,
        leaveRoom,
        setRoomConversation,
        receiveJoinedRooms,
        showSpinner,
        hideSpinner,
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

    React.useEffect(
        () => {
            showSpinner();
            const client = sdk.createClient({
                baseUrl: DEFAULT_HS_URL,
                accessToken: access_token,
                userId: user_id,
            });
            client.startClient({ lazyLoadMembers: true });
            new Promise<any>((resolve: any, reject: any) => {
                client.on('sync', (state, payload) => {
                    if (state === 'SYNCING') {
                        resolve(client);
                    } else if (state === 'ERROR') {
                        reject(payload.error);
                    } else if (state === 'PREPARED') {
                        const roomList = client.getRooms();
                        const latestJoinedRooms = prepareJoinedRooms(roomList);
                        receiveJoinedRooms(latestJoinedRooms);
                        hideSpinner();
                    }
                });
                client.on('RoomMember.membership', (event, member) => {
                    if (member.membership === 'invite' && member.userId === user_id) {
                        client.joinRoom(member.roomId);
                    }
                });
            });
        },
        [access_token],
    );
    // client.on("Room", function (res) {
    //     const {
    //         myUserId,
    //         roomId
    //     } = res;

    //     if (room && myUserId === user_id && room.roomId === roomId) {
    //         const roomList = client.getRooms();
    //         const joinedRooms = prepareJoinedRooms(roomList);
    //         receiveJoinedRooms(joinedRooms);
    //         console.log('111')
    //     } else {
    //         console.log(room)
    //         console.log(user_id)
    //         console.log(res)
    //     }
    // });
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
                    Joined Rooms
                </Typography>
                <List>
                    {(joinedRooms || []).map((item: IRoomType) => (
                        <ListItem key={item.roomId}>
                            <Button
                                size="small"
                                fullWidth
                                style={{
                                    justifyContent: 'flex-start',
                                }}
                                onClick={() => {
                                    setRoomConversation(item);
                                }}
                            >
                                {item.name}
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography variant="h6" color="inherit" gutterBottom>
                    Rooms
                </Typography>
                <List>
                    {rooms.map((item: IRoomType) => (
                        <ListItem
                            key={item.roomId}
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
                            {room.name}
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
