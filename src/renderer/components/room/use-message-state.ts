import { useState } from 'react';

export default initialState => {
    const [message, setMessage] = useState(initialState);
    return {
        message,
        onChange: ({ target }: any): void => {
            setMessage(target.value);
        },
        resetMessage: (): void => {
            setMessage('');
        },
    };
};
