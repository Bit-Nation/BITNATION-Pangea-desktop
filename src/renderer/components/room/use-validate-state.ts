import * as _ from 'lodash';
import { useState } from 'react';
import * as validator from 'validator';

export default initialState => {
    const [errors, setErrors] = useState(initialState);

    return {
        errors,
        validateForm: (message: string): boolean => {
            let valid = true;
            let newErrors = errors;
            newErrors = { ...newErrors, message: validator.isEmpty(message) };
            setErrors(newErrors);

            _.forOwn(newErrors, (value, key) => {
                if (value) {
                    valid = false;
                }
            });
            return valid;
        },
        validate: ({ target }: any): void => {
            setErrors({ ...errors, [target.name]: validator.isEmpty(target.value) });
        },
    };
};
