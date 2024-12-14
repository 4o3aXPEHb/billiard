import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    // Styling for the Verify Email page
    const containerStyle = {
        backgroundImage: `url('/verify-email-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    };

    const formContainerStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        width: '100%',
        maxWidth: '400px',
    };

    const messageStyle = {
        fontSize: '16px',
        marginBottom: '20px',
        color: 'white',
    };

    const statusStyle = {
        fontSize: '16px',
        marginBottom: '20px',
        fontWeight: 'bold',
        color: 'green',
    };

    const primaryButtonStyle = {
        backgroundColor: '#FFD700',
        color: '#000',
        borderRadius: '5px',
        padding: '15px 30px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        fontSize: '18px',
        transition: 'transform 0.3s ease',
    };

    const linkStyle = {
        color: '#FFD700',
        textDecoration: 'underline',
        fontSize: '16px',
        marginLeft: '10px',
        cursor: 'pointer',
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <p style={messageStyle}>
                        Thanks for signing up! Before getting started, could you verify your email address by clicking
                        on the link we just emailed to you? If you didn't receive the email, we will gladly send you
                        another.
                    </p>

                    {status === 'verification-link-sent' && (
                        <p style={statusStyle}>
                            A new verification link has been sent to the email address you provided during registration.
                        </p>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <PrimaryButton
                                style={primaryButtonStyle}
                                disabled={processing}
                            >
                                Resend Verification Email
                            </PrimaryButton>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                style={linkStyle}
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
