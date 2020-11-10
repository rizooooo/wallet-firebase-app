import { InputTypes } from "../../common/components/form/types";

const config = (params = {}) => {
    return [
        {
            row: 1,
            cols: [
                {
                    name: 'email',
                    label: 'Email',
                    size: 12,
                    type: InputTypes.Text,
                    placeholder: 'e.g. johndoe@gmail.com',
                    rules: {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        },
                        required: 'Email is required',
                        // validate: value => 
                    }
                },
            ]
        },
        {
            row: 2,
            cols: [
                {
                    name: 'password',
                    label: 'Password',
                    size: 12,
                    type: InputTypes.Password,
                    placeholder: 'Password'
                },
            ]
        }
    ]
}

export default config;