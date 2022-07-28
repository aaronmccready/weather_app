import React from "react";

const ToggleTempUnits = (props) => {
	return (
		<label id="toggleUnits">
			<input type="checkbox" onClick={props.toggle} />
			<span className="slider">
				<div className="tempUnits">
					<span>C</span>
					<span>F</span>
				</div>
			</span>
		</label>
	);
};
export default ToggleTempUnits;