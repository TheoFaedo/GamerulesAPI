import vine from '@vinejs/vine'

export const createMealValidator = vine.compile(
    vine.object({
        energy: vine.number(),
        carbohydrates: vine.number(),
        fats: vine.number(),
        proteins: vine.number(),
        name: vine.string(),
        serving_size: vine.string()
    })
)

export const createFastValidator = vine.compile(
    vine.object({
        energy: vine.number(),
        carbohydrates: vine.number(),
        fats: vine.number(),
        proteins: vine.number()
    })
)

export const createRecipeValidator = vine.compile(
    vine.object({
        energy: vine.number(),
        carbohydrates: vine.number(),
        fats: vine.number(),
        proteins: vine.number(),
        name: vine.string(),
        serving_size: vine.string(),
        components: vine.array(vine.object({
            id: vine.number(),
            quantity: vine.number()
        })
        )
    })
)

export const updateConsumableValidator = vine.compile(
    vine.object({
        energy: vine.number().optional(),
        carbohydrates: vine.number().optional(),
        fats: vine.number().optional(),
        proteins: vine.number().optional(),
        name: vine.string().optional(),
        serving_size: vine.string().optional(),
        isPublic: vine.boolean().optional(),
        components: vine.array(vine.object({
            id: vine.number(),
            quantity: vine.number()
        }).optional())
    })
)

export const consumableIdValidator = vine.compile(
    vine.object({
        id: vine.number().positive()
    })
)