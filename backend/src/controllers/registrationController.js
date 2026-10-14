import { getSupabaseClient } from '../config/supabase.js';
import { sendRegistrationConfirmationEmail } from '../services/emailService.js';

/**
 * Handle new workshop registration
 * POST /api/registrations
 */
export async function createRegistration(req, res, next) {
  try {
    const { name, email, phone, college, department, year } = req.validatedData;
    const normalizedEmail = email.trim().toLowerCase();

    const supabase = getSupabaseClient();
    const tableName = process.env.SUPABASE_REGISTRATIONS_TABLE || 'registrations';

    // 1. Authoritative Database Insert
    const { data, error } = await supabase
      .from(tableName)
      .insert([
        {
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          college: college.trim(),
          department: department.trim(),
          year: year.trim(),
        },
      ])
      .select('id, name, email, college, department, year, created_at')
      .single();

    if (error) {
      // 23505 is PostgreSQL's standard code for unique_violation
      if (
        error.code === '23505' ||
        (error.message && error.message.toLowerCase().includes('duplicate')) ||
        (error.message && error.message.toLowerCase().includes('unique')) ||
        (error.details && error.details.toLowerCase().includes('already exists'))
      ) {
        return res.status(409).json({
          success: false,
          error: 'This email address is already registered for the ASTRION 2K26 workshop.',
        });
      }

      console.error('[DB ERROR] Supabase insert failure:', {
        code: error.code,
        message: error.message,
      });

      // Failed insert must NEVER trigger an email
      return res.status(500).json({
        success: false,
        error: 'Unable to process your registration at this time. Please try again or contact organizers.',
      });
    }

    // 2. Trigger Confirmation Email only AFTER successful database insert
    const emailResult = await sendRegistrationConfirmationEmail({
      name: data.name,
      email: data.email,
      phone: phone.trim(),
      college: data.college,
      department: department.trim(),
      year: year.trim(),
      registrationId: data.id,
      createdAt: data.created_at,
    });

    // 3. Return response accurately distinguishing database success from email delivery status
    if (emailResult.success) {
      return res.status(201).json({
        success: true,
        message: 'Registration confirmed! A confirmation email has been dispatched to your email address.',
        emailStatus: 'sent',
        emailMessageId: emailResult.id,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          college: data.college,
          createdAt: data.created_at,
        },
      });
    }

    // Email delivery failed or was skipped, but the database insert is authoritative and preserved
    return res.status(201).json({
      success: true,
      message: 'Registration successfully confirmed! (Confirmation email delivery was unavailable or skipped).',
      emailStatus: 'failed',
      emailNotice: emailResult.skipped
        ? 'Confirmation email was skipped (email service pending configuration).'
        : 'Your registration is safely recorded in the database, but the confirmation email could not be sent.',
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        college: data.college,
        createdAt: data.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get registration summary / status
 * GET /api/registrations/status
 */
export async function getRegistrationStatus(req, res, next) {
  try {
    const supabase = getSupabaseClient();
    const tableName = process.env.SUPABASE_REGISTRATIONS_TABLE || 'registrations';

    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      return res.status(200).json({
        status: 'open',
        track: 'Venture Launchpad: From Idea Generation to Business Creation',
        venue: 'VVIT University',
      });
    }

    return res.status(200).json({
      status: 'open',
      track: 'Venture Launchpad: From Idea Generation to Business Creation',
      venue: 'VVIT University',
      totalRegistered: count,
    });
  } catch (err) {
    next(err);
  }
}
