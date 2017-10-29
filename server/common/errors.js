export function createErrorWithCode (errorInfo){
	var errObj = new Error();
	errObj.message = errorInfo.message;
	errObj.name = errorInfo.name;

	return errObj
}