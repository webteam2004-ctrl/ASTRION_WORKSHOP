import { z } from 'zod';

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

export const registrationSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required.' })
    .trim()
    .min(2, 'Name must be at least 2 characters long.')
    .max(100, 'Name must not exceed 100 characters.'),
  email: z
    .string({ required_error: 'Email address is required.' })
    .trim()
    .email('Please enter a valid email address.')
    .max(255, 'Email must not exceed 255 characters.')
    .toLowerCase(),
  phone: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(7, 'Phone number must be at least 7 characters.')
    .max(20, 'Phone number must not exceed 20 characters.')
    .regex(phoneRegex, 'Please enter a valid phone number format.'),
  college: z
    .string({ required_error: 'College / Institution name is required.' })
    .trim()
    .min(2, 'College name must be at least 2 characters.')
    .max(150, 'College name must not exceed 150 characters.'),
  department: z
    .string({ required_error: 'Department / Branch is required.' })
    .trim()
    .min(2, 'Department must be at least 2 characters.')
    .max(100, 'Department must not exceed 100 characters.'),
  year: z
    .string({ required_error: 'Year of study is required.' })
    .trim()
    .min(1, 'Year of study must be specified.')
    .max(50, 'Year must not exceed 50 characters.'),
  website: z.string().optional().nullable(), // Honeypot field
});

export function validateRegistration(req, res, next) {
  // Honeypot check: Bots automatically fill every visible or hidden input.
  if (req.body && req.body.website && req.body.website.trim().length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Automated submission detected. Registration rejected.',
    });
  }

  const result = registrationSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      error: 'Please review and correct the form fields.',
      details: formattedErrors,
    });
  }

  // Attach validated & sanitized data to request
  req.validatedData = result.data;
  next();
}
