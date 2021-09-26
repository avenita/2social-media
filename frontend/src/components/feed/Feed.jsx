import { useEffect, useRef, useState, Suspense, useReducer, useCallback } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

// import { Posts as postDate } from "../../data/dummyData";
import { getPosts } from "../../services/posts.services";
import {API_URL} from '../../conf' // => 
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useNearScreen from "../../hooks/useNearScreen";
import debounce from "just-debounce-it";
import usePosts from "../../hooks/usePots";

const INITIAL_PAGE = 1;

const Feed = ({username}) => {

    const {username: searchUsername} = useParams();
    const user = useSelector(store => store.user.user);
    const [page, setPage] = useState(INITIAL_PAGE);
    const {posts, loading} = usePosts(username, user._id, page, setPage);
    const externalRef = useRef();
    

    const { show } = useNearScreen({
        distance: '200px',
        externalRef: posts.length > 0 ? externalRef : undefined, 
        once: false 
    })
    

    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(preValue => preValue + 1), 500
    ),[])
    
    useEffect(() => {
        if(show) debounceHandleNextPage()
    }, [show, debounceHandleNextPage]);


    const handleClick = () => {
        document.querySelector('.shareInput').focus();
    }
    
    return (
        <div className="feed-container" >
            <div className="feedWrapper">
                {
                    (!username || username === user.username) && <Share />
                }
                {   posts.length > 0
                        ?   <>
                                {
                                    posts.map(post =>
                                        <Post key={post._id} post={post} />
                                        )
                                }
                                <div id="visor" ref={externalRef}></div>
                            </> 

                        : <div className="feednoPost"
                                style={{display: 'block'}}
                                style={{display: searchUsername && !(searchUsername === user.username) && 'none'  }}
                                onClick={handleClick}>
                            Crea un nuevo post para compartir con tus contactos...
                          </div>
                }
            </div>
        </div>
    );
};

export default Feed;


