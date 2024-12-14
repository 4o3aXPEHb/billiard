import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import ProfileAppBar from "@/Pages/Profile/ProfileAppBar.jsx";

export default function Edit({ auth, mustVerifyEmail, status }) {
    // Styling for the profile page
    const containerStyle = {
        backgroundImage: `url('/profile-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: '20px 0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const contentWrapperStyle = {
        width: '100%',
        maxWidth: '1200px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const sectionStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    };

    return (
        <ProfileAppBar
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight" style={headerStyle}>
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div style={containerStyle}>
                <div style={contentWrapperStyle}>
                    <div style={sectionStyle}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div style={sectionStyle}>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div style={sectionStyle}>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </ProfileAppBar>
    );
}
