import { useRef, useEffect, MutableRefObject } from 'react';

function useFocusOnInput(): MutableRefObject<HTMLInputElement | null> {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return inputRef;
}

export default useFocusOnInput;
