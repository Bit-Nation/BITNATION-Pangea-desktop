import * as React from 'react';
import { Snackbar, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SPACING_PAPER } from '../../../utils/style';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / SPACING_PAPER,
    },
});

interface INotifierProps {
    message: string;
    open: boolean;
    handleClose(): void;
}
const Notifier = ({ open, handleClose, message }: INotifierProps) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={message}
        action={[
            <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>,
        ]}
    />
);

export default withStyles(styles)(Notifier);
