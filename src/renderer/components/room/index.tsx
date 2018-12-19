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
    ListItemAvatar,
    ListItemText,
    Avatar,
    TextField,
} from '@material-ui/core';
import * as sdk from 'matrix-js-sdk';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useMenuState from './use-menu-state';
import { DEFAULT_HS_URL } from '../../utils/config';
import { DRAWER_WIDTH, SPACING_PAPER } from '../../utils/style';
import { IRoomProps, IRoomStates } from './interface';
import { IRoomType, IMessageType } from '../../types/room';
import Loading from '../common/loading';
import useMessageState from './use-message-state';
import useValidateState from './use-validate-state';

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    messages: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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

const LinkToList = props => <Link to="/chat" {...props} />;

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

const Room = (
    {
        user: {
            user: { user_id, access_token },
        },
        chat: { joinedRooms },
        conversation: { messages, room, isFetching },
        router: {
            location: { pathname },
        },
        classes,
        logout,
        setRoomConversation,
        receiveMessageConversation,
        receiveJoinedRooms,
        hideSpinner,
        showSpinner,
    }: IRoomProps,
    {  }: IRoomStates,
) => {
    const { openMenu, anchorEl, handleCloseMenu, handleOpenMenu } = useMenuState(false, undefined);
    const { message, onChange, resetMessage } = useMessageState('');
    const { errors, validate, validateForm } = useValidateState({
        message: false,
    });
    const client = sdk.createClient({
        baseUrl: DEFAULT_HS_URL,
        accessToken: access_token,
        userId: user_id,
    });
    React.useEffect(
        () => {
            showSpinner();
            client.startClient({ lazyLoadMembers: true });
            new Promise<any>((resolve?: any, reject?: any) => {
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

                client.on('Room.timeline', (event, roomEvent, toStartOfTimeline) => {
                    if (toStartOfTimeline) {
                        return; // don't print paginated results
                    }
                    if (event.getType() !== 'm.room.message') {
                        return; // only print messages
                    }

                    // only fetch messages when on page room
                    if (roomEvent.roomId === room.roomId && pathname.includes('/room/')) {
                        const latestMessage = {
                            body: event.getContent().body,
                            sender: event.getSender(),
                        };
                        receiveMessageConversation(latestMessage);
                        // console.log(
                        //     // the room name will update with m.room.name events automatically
                        //     "(%s) %s :: %s", room.name, event.getSender(), event.getContent().body
                        // );
                    }
                });
                client.on('RoomMember.membership', (event, member) => {
                    if (member.membership === 'invite' && member.userId === user_id) {
                        client.joinRoom(member.roomId);
                    }
                });
                // client.on("RoomMember.typing", function (event, member) {
                //     if (member.typing) {
                //         console.log(member.name + " is typing...");
                //     }
                //     else {
                //         console.log(member.name + " stopped typing.");
                //     }
                // });
            });
        },
        [room],
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
                        {room.name}
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
                    Current conversations
                </Typography>
                <List>
                    {(joinedRooms || []).map((item: IRoomType) => (
                        <ListItem
                            key={item.roomId}
                            button
                            onClick={() => {
                                setRoomConversation(item);
                            }}
                        >
                            {item.name}
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Button variant="contained" color="primary" component={LinkToList}>
                    List
                </Button>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <List className={classes.messages}>
                    {(messages || []).map(({ sender, body }: IMessageType, index: number) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    alt=""
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={sender}
                                secondary={<React.Fragment>{body}</React.Fragment>}
                            />
                        </ListItem>
                    ))}
                </List>
                <form>
                    <TextField
                        id="outlined-message-input"
                        label="Writing something..."
                        name="message"
                        autoComplete="message"
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        onChange={e => {
                            onChange(e);
                            validate(e);
                        }}
                        value={message}
                        error={errors.message}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            const valid = validateForm(message);
                            if (valid) {
                                const content = {
                                    body: message,
                                    msgtype: 'm.text',
                                };
                                showSpinner();
                                client.sendEvent(
                                    room.roomId,
                                    'm.room.message',
                                    content,
                                    '',
                                    (err, res) => {
                                        hideSpinner();
                                        resetMessage();
                                    },
                                );
                            }
                        }}
                    >
                        Send
                    </Button>
                </form>
            </main>
            <Loading isLoading={isFetching} />
        </div>
    );
};

export default withStyles(styles)(Room);
