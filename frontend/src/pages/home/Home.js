import React from 'react';

//importando components
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'

//importando stilos
import './home.css'

export default function Home() {

    return (
        <>
            <TopBar />
            <section className="home-container">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </section>
        </>
    );
}