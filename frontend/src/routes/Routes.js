import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Home from '../pages/home/Home'
import Signin from '../pages/signin/Signin';
import Profile from '../pages/profile/Profile';
import Signup from '../pages/signup/Signup';
import RoutePrivat from './RoutesPrivate.routes';
import RoutePublic from './RoutesPublic.routes';
import Messeger from '../pages/messeger/Messeger';
import { useDispatch } from 'react-redux';
import { getToken, isAuthorized } from '../utils/auth';
import { setToken } from '../services/user.services';
import { decode } from 'jsonwebtoken';
import { userActions } from '../store/actions';
import Setting from '../pages/setting/Setting';
import { FindUsers } from '../pages/find-users/FindUsers';

// const Routes = ({children, signInSucess}) => {
const Routes = () => {

    const dispatch = useDispatch();

    //esto se renderiza cada que recargemos la pages
    if(isAuthorized()){
        const token = getToken();
        const user = decode(token);
        setToken(token);
        dispatch(userActions.signInSuccess(user))
    }


    return (
        
        <BrowserRouter>
            <Switch>
                <RoutePrivat exact path='/' component={Home}/>
                <RoutePrivat exact path='/findUsers/:username' component={FindUsers}/>
                <RoutePrivat exact path="/messeger" component={Messeger}/>
                <RoutePrivat exact path='/profile/config/:username' component={Setting}/>
                <RoutePrivat exact path='/profile/:username' component={Profile}/>
                <RoutePublic exact path='/signin' component={Signin}/>
                <RoutePublic exact path='/signup' component={Signup}/>
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

// const mapDispatchToProps = dispatch => {
//     return{
//         signInSucess : (user) => dispatch(userActions.signInSuccess(user))
//     }
// }

export default Routes;
// export default connect(null, mapDispatchToProps)(Routes)

/* notas:

     La routes de '*' debe estar siempre al final de todas las rutas y este no debe tener el atributo de exact
     en el tercer router estamos pasando un parametro con el nombre de username y este sera recivibo por el componente de User que debe de desectructurarlo con el hook de useParams 
*/

