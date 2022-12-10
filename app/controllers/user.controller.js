const catchAsync = require('../utils/catchAsync')
const User = require('../models/users.model')
const processResponse = require('../utils/processResponse')
const bcrypt = require('bcrypt');

const registerUser = catchAsync(async (req, res) => {
    const body = req.body
    const userRegister = await User(body)

    // validation request
    const error = userRegister.validateSync();
    if (error) {
        const errorValidation = processResponse.errorResponse('error.validation', error)
        return res.status(400).json(errorValidation)
    }

    // validation password
    const regex = /^(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>"\'[\]]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>"\'[\]]{8,20})$/
    if (!body.password.match(regex)) {
        return res.status(400).json({
            errorType: 'error.validation',
            errorMessage: {
                password: 'error.format'
            }
        })
    }

    // validation unique email
    const checkUnique = await User.findOne({email: body.email})
    if (checkUnique) {
        return res.status(400).json({
            errorType: 'error.validation',
            errorMessage: {
                email: 'error.registered'
            }
        })
    }

    let result = {}
    body.password = await bcrypt.hash(body.password, 16)
    try {
        const insertData = await User.create(body)
        result.data = {
            id: insertData.id,
            name: insertData.name,
            email: insertData.email,
            createdAt: insertData.createdAt,
            updatedAt: insertData.updatedAt,
        }
    } catch (error) {
        const errorValidation = processResponse.errorResponse('error.validation', error)
        return res.status(400).json(errorValidation)
    }

    return res.status(201).json(result)
})

module.exports = {
    registerUser
}