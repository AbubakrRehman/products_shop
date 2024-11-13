import {  useEffect, useRef } from "react";

type ClickOutsideProps = () => void

const useClickOutside1 = (callback: ClickOutsideProps) => {
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
                callback();
            }
        }

        document.addEventListener("click", clickHandler)
        return () => document.removeEventListener("click", clickHandler)

    }, [])

    return targetRef

}

export default useClickOutside1;