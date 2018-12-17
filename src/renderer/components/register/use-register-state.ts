import { useState } from 'react';
export default initialState => {
    const [data, setData] = useState(initialState);
    return {
        data,
        onChange: ({ target }: any): void => {
            setData({ ...data, [target.name]: target.value });
        },
    };
};
