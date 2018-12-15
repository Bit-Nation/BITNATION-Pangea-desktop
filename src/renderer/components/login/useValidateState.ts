import { useState } from 'react'
const validator = require('validator');

export default initialState => {
    const [errors, setErrors] = useState(initialState);

    return {
        errors,
        validate: ({ target }: any) => {
            setErrors(Object.assign(errors, { [target.name]: validator.isEmpty(target.value) }))
        }
    }
}