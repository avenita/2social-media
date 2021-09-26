import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";



const RoutePublic = (props) => {

    const user = useSelector(store => store.user.user)


    return ( 
            user 
                ? <Redirect to="/" />
                : <Route {...props} />
     );
}


// const mapStateToProps = state => {
//     return{
//         user: state.user
//     }
// }
// export default connect(mapStateToProps)(RoutesPrivate)

export default RoutePublic;