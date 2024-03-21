import Joi from "joi";

export const shoppingListSchema = Joi.object({
  ownerID: Joi.string().required().messages({
    "string.empty": "Die Besitzer-ID muss angegeben werden",
  }),
  name: Joi.string().min(1).max(100).required().messages({
    "string.min":
      "Der Name der Einkaufsliste muss mindestens {#limit} Zeichen lang sein",
    "string.max":
      "Der Name der Einkaufsliste darf höchstens {#limit} Zeichen lang sein",
    "string.empty": "Der Name der Einkaufsliste muss angegeben werden",
  }),
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.empty": "Der Artikelname muss angegeben werden",
        }),
        quantity: Joi.string().required().messages({
          "string.empty": "Die Menge muss angegeben werden",
        }),
        unit: Joi.string().required().messages({
          "string.empty": "Die Einheit muss angegeben werden",
        }),
      }),
    )
    .required()
    .messages({
      "array.includesRequiredUnknowns":
        "Artikel müssen Name, Menge und Einheit enthalten",
    }),
  sharedWith: Joi.array()
    .items(
      Joi.object({
        friendID: Joi.string().required(),
        friendUsername: Joi.string().required(),
      }),
    )
    .optional()
    .messages({
      "array.includesRequiredUnknowns":
        "Freund muss ID und Benutzernamen enthalten",
    }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
