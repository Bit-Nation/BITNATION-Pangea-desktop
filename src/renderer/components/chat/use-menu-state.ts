import { useState } from 'react';

export default (isOpen: boolean, anchor: any) => {
    const [openMenu, setOpenMenu] = useState(isOpen);
    const [anchorEl, setAnchorEl] = useState(anchor);
    return {
        anchorEl,
        openMenu,
        handleCloseMenu: (): void => {
            setOpenMenu(false);
        },
        handleOpenMenu: ({ currentTarget }: any): void => {
            setAnchorEl(currentTarget);
            setOpenMenu(true);
        },
    };
};
