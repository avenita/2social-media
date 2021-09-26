import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";



const RoutePrivat = (props) => {

    const user = useSelector(store => store.user.user)

    return ( 
            user 
                ? <Route {...props} />
                : <Redirect to="/signin" />
     );
}


// const mapStateToProps = state => {
//     return{
//         user: state.user
//     }
// }
// export default connect(mapStateToProps)(RoutesPrivate)

export default RoutePrivat;