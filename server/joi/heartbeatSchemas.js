import Joi from "joi";

const validFeatureTypes = ["ShoppingList"];

export const sendHeartbeatSchema = Joi.object({
  params: Joi.object({
    featureID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Feature-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Feature-ID ist erforderlich.",
    }),
  }),
  body: Joi.object({
    featureType: Joi.string()
      .valid(...validFeatureTypes)
      .required()
      .messages({
        "string.empty": "Der Feature-Typ muss angegeben werden.",
        "any.required": "Der Feature-Typ ist erforderlich.",
        "any.only": "Der angegebene Feature-Typ ist ungültig.",
      }),
  }),
}).messages({
  "object.unknown": "Sie haben ein unbekanntes Feld eingegeben.",
});

export const lockFeatureEditSchema = Joi.object({
  params: Joi.object({
    featureID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Feature-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Feature-ID ist erforderlich.",
    }),
  }),
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
    featureType: Joi.string()
      .valid(...validFeatureTypes)
      .required()
      .messages({
        "string.empty": "Der Feature-Typ muss angegeben werden.",
        "any.required": "Der Feature-Typ ist erforderlich.",
        "any.only": "Der angegebene Feature-Typ ist ungültig.",
      }),
  }),
}).messages({
  "object.unknown": "Sie haben ein unbekanntes Feld eingegeben.",
});

export const unlockFeatureEditSchema = Joi.object({
  params: Joi.object({
    featureID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Feature-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Feature-ID ist erforderlich.",
    }),
  }),
  body: Joi.object({
    featureType: Joi.string()
      .valid(...validFeatureTypes)
      .required()
      .messages({
        "string.empty": "Der Feature-Typ muss angegeben werden.",
        "any.required": "Der Feature-Typ ist erforderlich.",
        "any.only": "Der angegebene Feature-Typ ist ungültig.",
      }),
  }),
}).messages({
  "object.unknown": "Sie haben ein unbekanntes Feld eingegeben.",
});
