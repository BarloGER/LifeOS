import Joi from "joi";

export const signUpSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
      .required()
      .messages({
        "string.email": "Die E-Mail muss mit .com, .de oder .net enden",
        "string.empty": "Die E-Mail muss angegeben werden",
      }),
    password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
      "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Das Passwort muss angegeben werden",
    }),
    friends: Joi.array()
      .items(
        Joi.object({
          friendID: Joi.string().required(),
          friendUsername: Joi.string().required(),
        }),
      )
      .optional(),
    messages: Joi.array()
      .items(
        Joi.object({
          friendRequestFrom: Joi.array().items(
            Joi.object({
              friendID: Joi.string().required(),
              friendUsername: Joi.string().required(),
            }),
          ),
        }),
      )
      .optional(),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const signInSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
      .required()
      .messages({
        "string.email": "Die E-Mail muss mit .com, .de oder .net enden",
        "string.empty": "Die E-Mail muss angegeben werden",
      }),
    password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
      "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Das Passwort muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
