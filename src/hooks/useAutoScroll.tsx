import { useEffect, MutableRefObject } from 'react';

type UseAutoScrollProps = {
    ref: MutableRefObject<HTMLElement | null>;
    dependencies: React.DependencyList;
};

function useAutoScroll({ ref, dependencies }: UseAutoScrollProps): void {
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, dependencies);
}

export default useAutoScroll;
