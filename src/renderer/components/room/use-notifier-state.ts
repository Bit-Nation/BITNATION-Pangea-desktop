import { useState } from 'react';

export default initialState => {
    const [isOpenNotifier, setOpenNotifier] = useState(initialState);
    return {
        isOpenNotifier,
        onCloseNotifier: (): any => {
            setOpenNotifier(false);
        },
        onOpenNotifier: (): any => {
            setOpenNotifier(true);
        },
    };
};
