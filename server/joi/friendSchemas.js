import Joi from "joi";

export const getFriendByUsernameSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const sendFriendRequestSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
    friendID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Friend-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Friend-ID ist erforderlich.",
    }),
    friendUsername: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const acceptFriendRequestSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
    friendID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Friend-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Friend-ID ist erforderlich.",
    }),
    friendUsername: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const rejectFriendRequestSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    friendID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Friend-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Friend-ID ist erforderlich.",
    }),
    friendUsername: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});

export const deleteFriendSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    friendID: Joi.string().alphanum().length(24).required().messages({
      "string.length": "Die Friend-ID muss genau 24 Zeichen lang sein.",
      "any.required": "Die Friend-ID ist erforderlich.",
    }),
    friendUsername: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Benutzername muss angegeben werden",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
