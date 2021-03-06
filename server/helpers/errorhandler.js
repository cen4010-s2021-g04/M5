const getErrorMessage = (err) => {
	let message = '';
	
	if (err.code) 
	{
		switch(err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default: message = 'Unknown Error';
		}
	}
	else {
		for (let e in err. err.erros) {
			if (err.errors[e].message)
				message = err.errors[e].message	
		}
	}
	
	return message;
};

const getUniqueErrorMessage = (err) => {
	let output;
	try {
		let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
	} catch(e) {
		output = 'Unique field already exists';
	}
	
	return output;
};