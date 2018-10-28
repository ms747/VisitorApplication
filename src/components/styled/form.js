import styled from "styled-components";

const Form = styled.form`
	fieldset > div {
		display: flex;
		flex-direction: column;
	}

	fieldset > div > label {
		align-self: flex-start;
	}
`;

export default Form;