import { useState } from 'react'
const validator = require('validator');

export const validation = {
    username: false,
    password: false
}

export default initialState => {
    const [data, setData] = useState(initialState);

    const [errors, setErrors] = useState(validation);
    return {
        data,
        errors,
        onChange: ({ target }: any) => {
            setData(Object.assign(data, { [target.name]: target.value }))
            setErrors(Object.assign(errors, { [target.name]: validator.isEmpty(target.value) }))
        }
    }
}