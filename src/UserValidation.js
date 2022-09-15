import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required().min(4).max(10).required(),
    pword: yup.string().min(4).max(15).required(),
    // idNumber: ,

})