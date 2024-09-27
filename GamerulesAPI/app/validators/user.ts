import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().maxLength(64),
        password: vine.string().trim().maxLength(32)
    })
)

export const registerUserValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().maxLength(64),
        password: vine.string().trim().minLength(8).maxLength(32),
        name: vine.string().trim().maxLength(14)
    })
)