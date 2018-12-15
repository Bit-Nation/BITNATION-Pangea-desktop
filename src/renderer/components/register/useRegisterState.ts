import { useState } from 'react';
const validator = require('validator');

export const validation = {
    email: false,
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

            switch (target.name) {
                case 'email':
                    setErrors(Object.assign(errors, { [target.name]: !validator.isEmail(target.value) }))
                    break;
                default:
                    setErrors(Object.assign(errors, { [target.name]: !validator.isEmpty(target.value) }))
                    break;
            }
        }
    }
}
