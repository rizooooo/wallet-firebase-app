import { InputTypes } from "../../common/components/form/types";

const config = (params = {}) => {
    return [
        {
            row: 1,
            // title: 'Add a Person',
            customClass: 'mt-2',
            cols: [
                {
                    name: 'amount',
                    label: 'Amount ',
                    inputClass: 'text-right font-weight-bold',
                    size: 12,
                    type: InputTypes.Number,
                    placeholder: 'e.g. 1232',
                    rules: {
                        required: 'Amount is required',
                    }
                },
            ]
        },
        {
            row: 2,
            // title: 'Add a Person',
            customClass: 'mt-2',
            cols: [
                {
                    name: 'description',
                    label: 'Description',
                    size: 12,
                    type: InputTypes.TextArea,
                    placeholder: 'e.g. LOAD, Food etc.',
                    rules: {
                        required: 'Description is required',
                    }
                },
            ]
        },
    ]
}

export default config;