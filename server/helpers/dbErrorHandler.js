// getUniqueErrorMessage
//     goal - catch errors with Mongoose's unique contraint 
//     parses the unique contraint-related error object
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = 
        err.message.substring(err.message.lastindexOd('.$') + 2, err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).tupUpperCase() + fieldName.slice(1) + ' already exists' 
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}


// getErrorMessage -- parse/return error message
const getErrorMessage = (err) => {
    let message= ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
       }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
            message = err.errors[errName].message
        }
    }
    return message
}

export default {getErrorMessage}
