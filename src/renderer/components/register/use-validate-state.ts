import * as _ from 'lodash';
import { useState } from 'react';
import * as validator from 'validator';

export default initialState => {
    const [errors, setErrors] = useState(initialState);

    return {
        errors,
        validateForm: (data: []): boolean => {
            let valid = true;
            let newErrors = errors;
            _.forOwn(data, (value, key) => {
                switch (key) {
                    case 'email':
                        newErrors = { ...newErrors, [key]: !validator.isEmail(value) };
                        break;
                    default:
                        newErrors = { ...newErrors, [key]: validator.isEmpty(value) };
                }
            });
            setErrors(newErrors);

            _.forOwn(newErrors, (value, key) => {
                if (value) {
                    valid = false;
                }
            });
            return valid;
        },
        validate: ({ target }: any): void => {
            switch (target.name) {
                case 'email':
                    setErrors({ ...errors, [target.name]: !validator.isEmail(target.value) });
                    break;
                default:
                    setErrors({ ...errors, [target.name]: validator.isEmpty(target.value) });
            }
        },
    };
};
