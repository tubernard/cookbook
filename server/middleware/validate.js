import { z } from 'zod';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ errors: z.flattenError(error).fieldErrors });
    }
    next(error);
  }
};

export default validate;
