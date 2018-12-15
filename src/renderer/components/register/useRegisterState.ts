import { useState } from 'react';
export default initialState => {
    const [data, setData] = useState(initialState);
    return {
        data,
        onChange: ({ target }: any) => {
            setData(Object.assign(data, { [target.name]: target.value }))
        }
    }
}
