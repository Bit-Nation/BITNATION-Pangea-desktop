import * as _ from 'lodash';
import { useState } from 'react';
import * as validator from 'validator';

export default initialState => {
    const [errors, setErrors] = useState(initialState);

    return {
        errors,
        validateForm: (data: []) => {
            let valid = true;
            _.forOwn(data, (value, key) => {
                setErrors({...errors,  [key]: validator.isEmpty(value)});
            });
            _.forOwn(errors, (value, key) => {
                if (value) {
                    valid = false;
                }
            });
            return valid;
        },
        validate: ({ target }: any) => {
            setErrors({...errors,  [target.name]: validator.isEmpty(target.value)});
        },
    };
};
