const errorResponse = (type, errors) => {
    let objtError = JSON.parse(JSON.stringify(errors.errors))
    let result = {
        errorType: type,
        errorMessage: {}
    }

    Object.values(objtError).forEach(row => {
        result.errorMessage[row.path] = row.message
    });

    return result
}

module.exports = {
    errorResponse
}