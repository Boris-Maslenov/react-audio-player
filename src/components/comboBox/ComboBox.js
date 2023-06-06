import React from 'react';
import { useCombobox } from 'downshift';

export const ComboBox = ({ className, history, value, onChange }) => {
    const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
        items: history,
        onInputValueChange: ({ inputValue }) => {
            onChange(inputValue);
        },
        selectedItem: value,
    });
    return (
        <>
            <input className={className} {...getInputProps()} placeholder="https://" required />
            <ul {...getMenuProps()} className="get-audio__list">
                {isOpen &&
                    history.map((item, index) => (
                        <li
                            style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.length > 48 ? item.slice(0, 49) + '...' : item}
                        </li>
                    ))}
            </ul>
        </>
    );
};
