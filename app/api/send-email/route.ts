import { NextRequest, NextResponse } from 'next/server';

// Create a proxy API endpoint that will handle the email sending
// without exposing credentials to the client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Log the form submission (you can remove this in production)
    console.log('Contact form submission:', { name, email });
    
    // In a real implementation, you would use a server-side email service here
    // For now, we'll simulate a successful email send
    
    // This is where you would integrate with a server-side email service
    // such as SendGrid, Mailgun, AWS SES, etc.
    
    // For demonstration, we'll just return success
    // In production, replace this with actual email sending code
    
    return NextResponse.json({ 
      success: true,
      message: 'Your message has been received. Thank you for contacting us!'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
