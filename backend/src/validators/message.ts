import { zValidator } from '@hono/zod-validator';
import * as z from 'zod';
import { JSON } from '../utils/commonConstants.ts';
import { BAD_REQUEST_ERROR } from '../utils/errors.ts';

const createMessageSchema = z.object({
    author: z.string().min(1).max(50),
    content: z.string().min(1).max(256),
});

export const validateCreateMessage = zValidator(
    JSON,
    createMessageSchema,
    (result, { json }) => {
        if (!result.success) {
            return json(...BAD_REQUEST_ERROR);
        }
    }
);
