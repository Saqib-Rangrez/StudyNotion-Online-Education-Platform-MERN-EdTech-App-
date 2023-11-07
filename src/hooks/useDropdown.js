import React, { useEffect, useRef, useState } from 'react'

function useDropdown () {

    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleClickOutside (event) {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {isOpen, toggleDropDown, dropDownRef, setIsOpen} ;
}

export default useDropdown