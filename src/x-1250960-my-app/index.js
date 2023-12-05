import {createCustomElement} from '@servicenow/ui-core';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const EMPLOYEE_SAVE_REQUESTED = "USER_FETCH_REQUESTED";
const USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS';
const USER_CREATION_ERROR = 'USER_CREATION_ERROR';


const view = (state, {updateState, dispatch}) => {

	const saveEmployee = () => {
		const {name, age} = state;
		dispatch(EMPLOYEE_SAVE_REQUESTED, {data: {name, age}})
	}
	return (
		<div>
			<label htmlFor="name">Name:</label>
			<input type="text" id="name" on-change={(event) => updateState({ name: event.target.value})}/>

			<label htmlFor="age">Age:</label>
			<input type="number" id="age" on-change={(event) => updateState({ age: event.target.value})}/>

			<button type="button" on-click={saveEmployee}>Save</button>
		</div>
	);
};

const saveEmployeeHandler = createHttpEffect('/api/now/table/x_1250960_my_app_employee', {
	method: 'POST',
	headers: {Accept:'application/json', ContentType:'application/json'},
	dataParam: 'data',
	successActionType: USER_CREATION_SUCCESS,
	errorActionType: USER_CREATION_ERROR
});

createCustomElement('x-1250960-my-app', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers: {
		[EMPLOYEE_SAVE_REQUESTED]: saveEmployeeHandler,
		[USER_CREATION_SUCCESS]:() => alert('The record was created successfully!'),
		[USER_CREATION_ERROR]: () => alert('An error occurred while creating the record.')
	}
});
