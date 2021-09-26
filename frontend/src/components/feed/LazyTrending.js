import React, { Suspense } from 'react';
import useNearScreen from "../../hooks/useNearScreen"
import Feed from './Feed';

const FeedLazy = React.lazy(
    () => import('./Feed')
)

export default function LazyTrending() {
    const { elementRef, show } = useNearScreen({distance: '1200px'})

    return (
        <div ref={elementRef}>
            <Suspense fallback={'Estoy cargando...'}>
                {show ? <Feed/> : null}
            </Suspense>
        </div>
    )
}