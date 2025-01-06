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

export const consumeValidator = vine.compile(
    vine.object({
        mealId: vine.number(),
        quantity: vine.number(),
        date: vine.date(),
        mealType: vine.enum(['breakfast', 'lunch', 'dinner', 'snack'])
    })
)

export const consumedValidator = vine.compile(
    vine.object({
        date: vine.date().optional(),
    })
)