import {useState, useContext} from 'react';

import useSocket from './../context/Socket';

import DataContext from './../context/DataContext';

import * as yup from 'yup';


let dataSchema = yup.object().shape({
	nickname: yup.string().required()
});

const LoginForm = function() {

	const {nickname, setNickname} = useContext(DataContext);
	const [validSchema, setValidSchema] = useState(false);
	const socket = useSocket();

	function loginHandler() {
		if (validSchema) {
			const data = { nickname };
			const payload = { method: "login", data };
			socket.send(JSON.stringify(payload));
		}
	}

	function validSchemaHandler() {
		setNickname(event.target.value);
		dataSchema.isValid({ nickname: event.target.value })
		.then(valid=>{
			if (valid) {
				setValidSchema(true);
			} else {
				setValidSchema(false);
			}
		});

	}

	function enterHandler(event) {
		if (event.key === "Enter") {
			loginHandler();
		}
	}

	return(
		<div className="flex flex-col text-center lg:mx-64 md:mx-32 mx-16">
			<label 
				className="my-2 text-xl text-light" 
				htmlFor="nickname">
				Choose a nickname
			</label>
			
			<input 
				onKeyDown={enterHandler}
				onChange={validSchemaHandler}
				className="my-2 text-light bg-darker border-2 border-light rounded text-center"
				id="nickname"
				type="text"
			/>
			
			<button
				disabled={!validSchema}
				onClick={loginHandler}
				className="
					my-2 font-extrabold rounded
					bg-light text-darker disabled:bg-semilight hover:bg-white
					">
				Login
			</button>
		</div>
	);
}

export default LoginForm;