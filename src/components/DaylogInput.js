import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as daylogAction from '../reducers/dayLog';
import waterImg from '../../water_icon3.jpg';
import axios from 'axios';
import moment from 'moment';

axios.defaults.withCredentials = true;

const DaylogInput = (props) => {
	let [values, setValues] = useState({});
	const dispatch = useDispatch();

	const handleInputTextChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleWaterclick = (e) => {
		const { name } = e.target;
		if (name === 'waterAdd') {
			if (values.water !== undefined) {
				let newWaterValue = values.water;
				newWaterValue.push(values.water.length + 1);
				setValues({ ...values, water: newWaterValue });
			} else {
				setValues({ ...values, water: [1] });
			}
		} else {
			let newWaterValue = values.water;
			newWaterValue.pop();
			setValues({ ...values, water: newWaterValue });
		}
	};
	const handleOK = () => {
		console.log('OK Clicked!');
		console.log(values);
		const today = moment().format('YYYY-MM-DD');
		console.log('today', today);
		// redux 에 있는 userid, youtube.title, youtube.time 정보를 전달 필요
		// data: {userid, message, weight, youtube.title, youtube.time, youtube.url 등 selectVideo 전체}
		// axios.post('localhost:7777', data)
		dispatch(daylogAction.postDaylog(values));
	};
	const handleTagAdd = (e) => {
		if (e.key === 'Enter') {
			console.log('tag input enter!');
			let tags = values.tags;
			if (tags === undefined) {
				tags = [values.tagInput];
			} else {
				tags.push(values.tagInput);
			}
			setValues({ ...values, tags: tags, tagInput: '' });
		}
	};

	return (
		<div>
			<h3> Daylog Input </h3>
			<div>
				<textarea
					placeholder="오늘 운동 어땠나요?"
					name="message"
					onChange={handleInputTextChange}
				/>
			</div>
			<div>
				Wieght:
				<input name="weight" type="number" onChange={handleInputTextChange} />
			</div>
			<div>
				Water Intake:{' '}
				<div>
					<img
						src={waterImg}
						width="24px"
						height="24px"
						name="waterAdd"
						onClick={handleWaterclick}
					/>
					+300ml
					{values.water ? (
						values.water.map((el) => {
							return (
								<img
									src={waterImg}
									width="24px"
									height="24px"
									name="waterRemove"
									onClick={handleWaterclick}
								/>
							);
						})
					) : (
						<div></div>
					)}
				</div>
			</div>
			<div>
				tags:{' '}
				<input
					name="tagInput"
					onChange={handleInputTextChange}
					onKeyPress={handleTagAdd}
					value={values.tagInput}
				/>
				{values.tags ? (
					values.tags.map((tag) => {
						return <div className="Daylogtag">{tag}</div>;
					})
				) : (
					<div></div>
				)}
			</div>
			<button onClick={handleOK}> OK</button>
		</div>
	);
};

export default DaylogInput;
