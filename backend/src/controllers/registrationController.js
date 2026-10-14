import { getSupabaseClient } from '../config/supabase.js';

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

      return res.status(500).json({
        success: false,
        error: 'Unable to process your registration at this time. Please try again or contact organizers.',
      });
    }

    // 2. Return standard successful registration response
    return res.status(201).json({
      success: true,
      message: 'Registration confirmed! Welcome to Venture Launchpad at ASTRION 2K26.',
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
