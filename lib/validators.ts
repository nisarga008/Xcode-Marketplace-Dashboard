import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().min(2).required(),
  status: Joi.string().valid("active", "out-of-stock").required(),
  vendor: Joi.string().min(2).required(),
  description: Joi.string().min(4).required(),
});

export const productSchemaPartial = productSchema.fork(
  ["name", "price", "stock", "category", "status", "vendor", "description"],
  (schema) => schema.optional()
);
