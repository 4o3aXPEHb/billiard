import { useEffect, useState } from 'react'; // Добавляем useState
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    // Стили для страницы
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

    const checkboxStyle = {
        color: 'white',
        marginBottom: '20px',
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
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <h1 style={headingStyle}>Log in</h1>
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
                                isFocused={true}
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                style={inputStyle}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4" style={checkboxStyle}>
                            <label className="flex items-center text-white">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm">Remember me</span>
                            </label>
                        </div>

                        <div style={buttonContainerStyle}>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-white hover:text-gray-400"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <PrimaryButton
                                className="ms-4"
                                style={isHovered ? { ...primaryButtonStyle, ...hoverStyle } : primaryButtonStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                disabled={processing}
                            >
                                Войти
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
