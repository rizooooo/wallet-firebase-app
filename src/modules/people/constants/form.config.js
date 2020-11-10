import { InputTypes } from "../../common/components/form/types";

const config = (params = {}) => {
    return [
        {
            row: 1,
            // title: 'Add a Person',
            customClass: 'mt-2',
            cols: [
                {
                    name: 'name',
                    label: 'Person Name',
                    size: 12,
                    type: InputTypes.Text,
                    placeholder: 'e.g. Juan',
                    rules: {
                        required: 'Name is required',
                        // validate: value => 
                    }
                },
            ]
        },
    ]
}

export default config;