import { useState } from 'react'
const validator = require('validator');

export default initialState => {
    const [errors, setErrors] = useState(initialState);

    return {
        errors,
        validate: ({ target }: any) => {
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