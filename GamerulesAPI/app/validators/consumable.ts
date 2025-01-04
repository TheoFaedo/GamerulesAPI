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