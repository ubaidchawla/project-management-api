module.exports = validate;
function validate(JoiSchema, data)
{
    const { error } = JoiSchema.validate(data, options);
    if (error) {
        return mapError(error)
    }
    return false;
}

const options = {
    abortEarly: false,
    errors: {
        escapeHtml: false,
        label: false
    }
}

const mapError = (error) => { 
    const errList = error.details;
    let newErrList = {}
    errList.map((err) => {
        const key = err.context.key
        const msg = err.message
        newErrList[key] = msg
    })
    return newErrList;
}