import './CategoriesDropDown.module.scss';
import React, { useState } from 'react'
import { FormControl, Dropdown, Badge } from 'react-bootstrap';
import { CustomMenuProps, CustomToggleProps } from './CategoriesDropDown.types';

// thx: https://react-bootstrap.netlify.app/components/dropdowns/#custom-dropdown-components
// thx: https://stackoverflow.com/questions/63900810/implement-react-bootstrap-custom-dropdown-example-in-typescript

// NOTE: The forwardRef is so that the Dropdown can access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
        <a
            className="text-secondary text-nowrap"
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                props.onClick(e);
            }}
        >
            {props.children}
      &nbsp;
      &#x25bc;
        </a>
    ));

const CustomMenu = React.forwardRef(
    ({ children, style, className, labeledBy }: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {

        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child: unknown) =>
                            !value || (child as any).props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);


export const CategoriesDropDown: React.FC = () => {
    return (
        <Badge pill variant="light" className="px-2 py-1">
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Category
            </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {
                        [
                            { id: 1, category: "Administrative" },
                            { id: 2, category: "Disposal" },
                            { id: 3, category: "Office Supplies" },
                            { id: 4, category: "Operations" },
                            { id: 5, category: "Recruitment Costs" },
                            { id: 6, category: "Safety" },
                            { id: 7, category: "Storage" },
                            { id: 8, category: "Tech/IT" }
                        ].map((cat) => (
                            <Dropdown.Item eventKey={cat.id.toString()} key={cat.id}>{cat.category}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Badge>
    );
}








