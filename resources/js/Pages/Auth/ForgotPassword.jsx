import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [isHovered, setIsHovered] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    // Стили
    const containerStyle = {
        backgroundImage: `url('/fon2.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    };

    const formContainerStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        width: '100%',
        maxWidth: '400px',
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: 'transparent',
        color: 'white',
    };

    const primaryButtonStyle = {
        backgroundColor: '#FFD700',
        color: '#000',
        borderRadius: '5px',
        padding: '10px 20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        fontSize: '16px',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#000',
        color: '#FFF',
        transform: 'scale(1.05)',
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <h1 style={headingStyle}>Forgot Password</h1>

                    <div className="mb-4 text-sm text-gray-300">
                        Forgot your password? No problem. Just let us know your email address, and we will email you a password reset link that will allow you to choose a new one.
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            style={inputStyle}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ms-4"
                                style={isHovered ? { ...primaryButtonStyle, ...hoverStyle } : primaryButtonStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
