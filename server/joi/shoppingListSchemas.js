import Joi from "joi";

export const createShoppingListSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    ownerID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Owner-ID muss genau 24 Zeichen lang sein.",
      "string.empty": "Die Owner-ID muss angegeben werden",
    }),
    name: Joi.string().min(1).max(30).required().messages({
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
    isLocked: Joi.boolean().valid(false).messages({
      "any.only": "Der Sperrstatus muss false sein beim Erstellen einer Liste.",
    }),
    lockedBy: Joi.object({
      userID: Joi.string().valid(""),
      username: Joi.string().valid(""),
    }).messages({
      "object.base": "lockedBy muss ein Objekt sein.",
    }),
    lockExpiresAt: Joi.valid(null).messages({
      "any.only": "LockExpiresAt muss null sein beim Erstellen einer Liste.",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const getAllShoppingListsSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.valid({}),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const getSingleShoppingListSchema = Joi.object({
  params: Joi.object({
    shoppingListID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Shopping List ID muss genau 24 Zeichen lang sein.",
      "string.empty": "Die Shopping List ID muss angegeben werden",
    }),
  }),
  body: Joi.valid({}),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const editShoppingListSchema = Joi.object({
  params: Joi.object({
    shoppingListID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Shopping List ID muss genau 24 Zeichen lang sein.",
      "string.empty": "Die Shopping List ID muss angegeben werden",
    }),
  }),
  body: Joi.object({
    name: Joi.string().min(1).max(30).required().messages({
      "string.min":
        "Der Name der Einkaufsliste muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Name der Einkaufsliste darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Name der Einkaufsliste muss angegeben werden",
    }),
    items: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string().alphanum().optional(),
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
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const deleteShoppingListSchema = Joi.object({
  params: Joi.object({
    shoppingListID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Shopping List ID muss genau 24 Zeichen lang sein.",
      "string.empty": "Die Shopping List ID muss angegeben werden",
    }),
  }),
  body: Joi.valid({}),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
