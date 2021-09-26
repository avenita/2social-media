import { useState, useRef, useEffect } from 'react';

const useNearScreen = ({ distance = '300px', externalRef, once = true } = {}) => {

    const [show, setShow] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        let observer;

        const element = externalRef ? externalRef.current : elementRef.current;
        // console.log('element use',element);

        const onChange = (entries, observer) => {
            const el = entries[0];

            if (el.isIntersecting) {
                setShow(true);
                // console.log('intersecting',el.isIntersecting);
                once && observer.disconnect();
            }else{
                !once && setShow(false)
            }
        }

        Promise.resolve(
            typeof IntersectionObserver !== 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: distance
            })

            element && observer.observe(element);
        })

        return () => observer && observer.disconnect();
    }, [externalRef]);


    return { show, elementRef }
}

export default useNearScreen;

/* notas:
    1) Un polyfill es una pequeña biblioteca que te da una funcional que le falta a tu navegador(browser) en este caso internteExplorer11 no tiene soporte a intersection-observer
*/