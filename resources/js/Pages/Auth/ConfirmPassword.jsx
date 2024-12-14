import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    // Styling for the Confirm Password page
    const containerStyle = {
        backgroundImage: `url('/confirm-password-bg.jpg')`,
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
        transition: 'transform 0.3s ease',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <p style={messageStyle}>
                        This is a secure area of the application. Please confirm your password before continuing.
                    </p>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                style={inputStyle}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div style={buttonContainerStyle}>
                            <PrimaryButton
                                className="ms-4"
                                style={primaryButtonStyle}
                                disabled={processing}
                            >
                                Confirm
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
