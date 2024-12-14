import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    // Styling for the Reset Password page
    const containerStyle = {
        backgroundImage: `url('/fon2.jpg')`,
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

    const headingStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '20px',
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '12px',
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
        padding: '15px 30px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        fontSize: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#000',
        color: '#FFF',
        transform: 'scale(1.05)',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <h1 style={headingStyle}>Reset Password</h1>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                style={inputStyle}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                style={inputStyle}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                style={inputStyle}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div style={buttonContainerStyle}>
                            <PrimaryButton
                                className="ms-4"
                                style={primaryButtonStyle}
                                disabled={processing}
                            >
                                Reset Password
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
