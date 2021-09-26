import {Edit, Check} from '@material-ui/icons'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CancelRem} from '../../pages/setting/Setting'
import { userActions } from '../../store/actions';

const initialValue = {
    desc: '', from: '', city:'', relationship: 0
}
const initialFocusValue = {
    desc: false, from: false, city:false
}


const SettingGeneral = () => {

    const {user} = useSelector(store => store.user);

    const [form, setForm] = useState(initialValue);
    const [contador, setContador] = useState(0);
    const [focus, setFocus] = useState({});
    const [cancel, setCancel] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        reset();
    }, [user]); //muy importante poner esto

    const handleChange = e => {
        setContador(1);
        setCancel(true);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setFocus({
            ...focus,
            [e.target.name]: true
        })
    }

    const reset = () => {
        setContador(0);
        setForm({
            desc: user.desc || '',
            from: user.from || '',
            city: user.city || '',
            relationship: user.relationship || 1
        })
        document.querySelectorAll('input').forEach(input => {
            input.setAttribute('disabled', 'sasas')
            input.classList.remove('edit')
        } )
        setCancel(false);
        setFocus(initialFocusValue);
    }
    //debemos de validar con el cancel a la hora de enviar el formulario

    const onDisable = (target) => {
        document.querySelector(`input[name=${target}]`).toggleAttribute('disabled');
        document.querySelector(`input[name=${target}]`).classList.toggle('edit');
        document.querySelector(`input[name=${target}]`).matches('edit')   && document.querySelector(`input[name=${target}]`).focus();
        
        setFocus({
            ...focus,
            [target]: !focus[target]
        })
    }

    const handleCancel = target => {
        onDisable(target);
        setForm({
            ...form,
            [target]: user[target]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(contador === 1){
            // console.log(form) 
            try {
                dispatch(userActions.updateUserRequest(form, user._id)); 
                // setTimeout(() => dispatch(userActions.isSignError(null)) , 3000);
            } 
            catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className="settingOptionsBottom">
            <h3 className="settingOptionSubtitle">
                Configuracion General
            </h3>
            <div className="settingOptionsBottomWrapper">
                <div className="settingLabels">
                    <label htmlFor="desc">Description </label>
                    <label htmlFor="from">From </label>
                    <label htmlFor="city">City </label>
                    <label htmlFor="relationship">Relationship </label>
                </div>

                <form className="settingInputs" onSubmit={handleSubmit}>
                    <div className="settingInputContainer">
                        <input
                            disabled
                            autoComplete="off"
                            type="text"
                            name="desc"
                            id="desc"
                            onChange={handleChange}
                            value={form.desc} />
                        {
                            focus.desc
                                ? <>
                                    <CancelRem
                                        onClick={() => handleCancel('desc')} />
                                    <Check
                                        className="settingIconEdit"
                                        onClick={() => onDisable('desc')} />
                                </>
                                : <Edit
                                    className="settingIconEdit"
                                    onClick={() => onDisable('desc')} />
                        }
                    </div>
                    <div className="settingInputContainer">
                        <input
                            disabled
                            autoComplete="off"
                            type="text"
                            name="from"
                            id="from"
                            onChange={handleChange}
                            value={form.from} />
                        {
                            focus.from
                                ? <>
                                    <CancelRem
                                        onClick={() => handleCancel('from')} />
                                    <Check
                                        className="settingIconEdit"
                                        onClick={() => onDisable('from')} />
                                </>
                                : <Edit
                                    className="settingIconEdit"
                                    onClick={() => onDisable('from')} />
                        }
                    </div>
                    <div className="settingInputContainer">
                        <input
                            disabled
                            autoComplete="off"
                            type="text"
                            name="city"
                            id="city"
                            onChange={handleChange}
                            value={form.city} />
                        {
                            focus.city
                                ? <>
                                    <CancelRem
                                        onClick={() => handleCancel('city')} />
                                    <Check
                                        className="settingIconEdit"
                                        onClick={() => onDisable('city')} />
                                </>
                                : <Edit
                                    className="settingIconEdit"
                                    onClick={() => onDisable('city')} />
                        }
                    </div>
                    <select
                        name="relationship"
                        id="relationship"
                        value={form.relationship}
                        onChange={handleChange} >
                        <option value={1}>Soltero/a</option>
                        <option value={2}>Prometido/a</option>
                        <option value={3}>Casado/a</option>
                    </select>
                </form>
                <div className="settingButtons">
                    <button
                        onClick={handleSubmit}
                        className={`settingButton ${!cancel ? 'disabled' : ''}`}  >
                        Guardar Cambio
                    </button>
                    <button
                        className="settingButton"
                        onClick={reset}
                        style={{ display: cancel ? 'block' : 'none' }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingGeneral;