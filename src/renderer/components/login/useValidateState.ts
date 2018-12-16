import * as _ from 'lodash'
import { useState } from 'react'
const validator = require('validator')

export default initialState => {
    const [errors, setErrors] = useState(initialState)

    return {
        errors,
        validateForm: (data: []) => {
            let valid = true
            _.forOwn(data, function(value, key) {
                setErrors(Object.assign(errors, { [key]: validator.isEmpty(value) }))
            })
            _.forOwn(errors, function(value, key) {
                if (value) {
                    valid = false
                }
            })
            return valid
        },
        validate: ({ target }: any) => {
            setErrors(Object.assign(errors, { [target.name]: validator.isEmpty(target.value) }))
        },
    }
}
