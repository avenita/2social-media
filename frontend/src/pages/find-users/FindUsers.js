import Feed from '../../components/feed/Feed';
import FindUsersResult from '../../components/findUsers-resutl/FindUsersResult';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './findUsers.css';

export function FindUsers() {
    return (
        <>
            <Topbar />
            <section className="findUsers-container">
                <Sidebar />

                {/* resultados de busqueda se mostrara en este elemento */}
                <FindUsersResult />
                
                <Rightbar />
            </section>
        </>
    )
}