// import { useEffect, MutableRefObject } from 'react';

// type UseAutoScrollProps = {
//     ref: MutableRefObject<HTMLElement | null>;
//     dependencies: React.DependencyList;
// };

// function useAutoScroll({ ref, dependencies }: UseAutoScrollProps): void {
//     useEffect(() => {
//         if (ref.current) {
//             ref.current.scrollTop = ref.current.scrollHeight;
//         }
//     }, dependencies);
// }

// export default useAutoScroll;


import { useEffect, RefObject } from 'react';

interface UseAutoScrollProps {
    ref: RefObject<HTMLElement>;
    dependencies?: any[];
}

const useAutoScroll = ({ ref, dependencies = [] }: UseAutoScrollProps) => {
    useEffect(() => {
        const scrollContainer = ref.current;
        if (!scrollContainer) return;

        // Ensure we scroll after the DOM has been updated
        const timeoutId = setTimeout(() => {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [...dependencies]);
};

export default useAutoScroll;
