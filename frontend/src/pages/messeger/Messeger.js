import './messeger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useSelector } from 'react-redux'
import { getConversation } from '../../services/conversation.services'
import { getMessage, newMessageFetch } from '../../services/messages.services'
import { API_URL } from '../../conf'
import { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import useNearScreen from '../../hooks/useNearScreen';
import debounce from 'just-debounce-it'

const PAGE_INITIAL_VALUE = 1;

export default function Messeger() {

    const { user } = useSelector(store => store.user);
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // const [receiverId, setReceiverId] = useState(null);
    const [writeContac, setWriteContac] = useState(null);
    const scrollRef = useRef();
    const socket = useRef();

    //const para scroll infinite
    const [page, setPage] = useState(PAGE_INITIAL_VALUE);
    const [render, setRender] = useState(false);
    const externalRefMsg = useRef();
    const { show } = useNearScreen({
        distance: '10px',
        // externalRef: messages.length > 0 ? externalRefMsg : undefined,
        externalRef: render ? externalRefMsg : undefined,
        once: false
    })
    // console.log('page', page, 'show', show);


    const debounceHandleNextPageTwo = useCallback(debounce(
        () => setPage(preValue => preValue + 1), 800
    ), [])

    useEffect(() => {
        if (show) debounceHandleNextPageTwo()
    }, [show, debounceHandleNextPageTwo]);


    useEffect(() => {
        const getMesagesData = async () => {
            const res = await getMessage(`${API_URL}/messages/${currentChat?._id}?page=${page}`);
            // console.log('se renderizo porque cambio el page ps', res);
            // console.log([...res.docs,...messages])
            setMessages([...res.docs,...messages])
            if(!res.next){
                setRender(false);
                setPage(PAGE_INITIAL_VALUE);  
            } 
        }
        page > 1 && getMesagesData();

    }, [page]);


    //on para escuchar y emit para crear

    //efcto que inicializa nuestro socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

        //estamos a la escucha del q nos escribe
        socket.current.on('escriben', (msg) => {
            setWriteContac(msg);
            // currentChat?.members.includes(arrivalMessage.sender) &&
        })

        //con esto avisamos que nos desconectamos
        return () => {
            socket.current.emit('isDisconnect', socket.current.id)
        }
    }, [user]);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]);

    //efct que se encarga de registrar a un nuevo usuario y obtener usuarios connectads
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            // console.log(users);
            // console.log(user.followings);
            setOnlineUsers(
                user.followings.filter(f => users.some(u => u.userId === f))
            );
        })
    }, [user]);


    useEffect(() => {
        const getConversationData = async () => {
            try {
                const res = await getConversation(`${API_URL}/conversations/${user._id}`);
                setConversation(res);
            } catch (error) {
                console.log(error);
            }
        }

        getConversationData();
    }, [user._id]);

    // console.log('currentChat',currentChat)

    useEffect(() => {
        // console.log('se renderizo currentChat');
        const getMesagesData = async () => {
            try {
                const res = await getMessage(`${API_URL}/messages/${currentChat?._id}`)
                setMessages(res.docs);
                res?.next && setTimeout(() =>  setRender(true) , 1000);
            }
            catch (error) {
                console.log(error);
            }
        }
        getMesagesData();
    }, [currentChat]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        //formamos el objeto model
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        let receiverId = currentChat.members.find(member => member !== user._id)

        console.log(receiverId);

        /* avisamos al usuario que enviamos un nuevo mensaje */
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await newMessageFetch(`${API_URL}/messages`, message);
            // console.log(res);
            setMessages([...messages, res]);
            // setRender(true) //por si se nos 
            setNewMessage("");
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //efecto que se cuando hay cambios en messages 
        // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        console.dir(scrollRef.current);
        console.dir(scrollRef.current?.scrollHeight);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        // scrollRef?.current?.scrollTop;
    }, [messages]);


    const handleMessage = e => {

        // socket.current.emit('escribiendo', {receiverId, msg: `${user.username} con esta escribiendo...`});

        setNewMessage(e.target.value)
    }

    // const handleFocus = () => setReceiverId(
    //         currentChat.members.find(member => member !== user._id)
    // ) 

    const handleBlur = () => {
        // socket.current.emit('escribiendo', {receiverId, msg:''});
    }

    // console.log(messages);   
    // console.log('se renderisara el externarRefMsg',render);   
    // console.log(Date.now() + '12d434j343' );

    return (
        <>
            <Topbar />
            <div className="messeger-container">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            className="chatMenuInput"
                            placeholder="Search for friends"
                            type="text" />
                        {
                            conversation.map(c => (
                                <div key={c._id} onClick={() => setCurrentChat(c)} >
                                    <Conversation
                                        conversation={c}
                                        currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat && messages.length
                                ? <>
                                    <div className="chatBoxTop">
                                        {render && <div id="nextPage" ref={externalRefMsg}></div>}
                                        {
                                            messages?.map((msg ,i) => (
                                                <div key={msg.createdAt + i } 
                                                    ref={scrollRef}>
                                                    <Message
                                                        own={msg.sender === user?._id}
                                                        userId={msg.sender}
                                                        message={msg} />
                                                </div>
                                            ))
                                        }

                                        {/* { esto era para cuando alguien escribia
                                            currentChat.members.find(member => member === writeContac?.id) === writeContac?.id &&

                                                <span>
                                                    {writeContac?.msg}
                                                </span>
                                        } */}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            className="chatMessageInput"
                                            onChange={handleMessage}
                                            value={newMessage}
                                            // onFocus={handleFocus}
                                            // onBlur={handleBlur}
                                            placeholder="write something..." >
                                        </textarea>
                                        <button
                                            onClick={handleSubmit}
                                            className="chatSubmitButton">
                                            Send
                                        </button>
                                    </div>
                                </>
                                : <span className="noConversationText">
                                    Open a conversation to start a chat...
                                </span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper"
                    >
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>

        </>
    );
}