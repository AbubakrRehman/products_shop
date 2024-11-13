import { useEffect, useRef } from "react";

const useSkipFirstRender = (callback: React.EffectCallback , dependencies: React.DependencyList) => {
    const firstRenderRef = useRef(true);
    useEffect(() => {

        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        callback();

    }, [dependencies])

}

export default useSkipFirstRender;