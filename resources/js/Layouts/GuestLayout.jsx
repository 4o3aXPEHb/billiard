import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center" style={{ backgroundColor: '#1B1B1B' }}>
            <div>
                <Link href="/">
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                marginTop: '20px',
                                fontFamily: 'Comic Sans MS, sans-serif',
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: '#333',
                                borderRadius: '5px',
                                width: '170px',
                                textAlign: 'center',
                                marginBottom: '5px',
                            }}
                        >
                            Club 147
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Consolas, sans-serif',
                                color: 'white',
                                backgroundColor: '#333',
                                borderRadius: '5px',
                                width: '170px',
                                textAlign: 'center',
                            }}
                        >
                            Бильярдный клуб
                        </Typography>
                    </Box>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
