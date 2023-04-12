// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import './CategoriesDropDown.module.scss';
import React, { useState } from 'react'
import Select from "react-select";

const adminOptions = [
    { value: 1, label: "Administrative" },
    { value: 2, label: "Disposal" },
    { value: 3, label: "Office Supplies" },
    { value: 4, label: "Operations" },
    { value: 5, label: "Recruitment Costs" },
    { value: 6, label: "Safety" },
];
const techOptions = [
    { value: 7, label: "Data Storage" },
    { value: 8, label: "Tech/IT Personnel" },
    { value: 9, label: "Software" }
];
const groupedOptions = [
    {
        label: 'Administrative',
        options: adminOptions,
    },
    {
        label: 'Tech',
        options: techOptions,
    },
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CategoriesDropDownProps {

}

export const CategoriesDropDown = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    // REMOVED: inputId="aria-example-input"
    return (
        <form>
            <Select
                name="aria-live-color"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={groupedOptions}
            />
        </form>
    );
}







