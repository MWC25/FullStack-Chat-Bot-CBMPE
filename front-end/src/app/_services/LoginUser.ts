import api, { setAuthToken } from '../../../lib/axiosClient';

export async function loginUser(registration: string, password: string) {
    try {
        const res = await api.post('/api/login', {
            registration,
            password,
        });

        const data = res.data;

        if (data.accessToken) {
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setAuthToken(data.accessToken);
        }

        return { ok: true, data };
    } catch (error: any) {
        const data = {
            errorStatusCode: error.status,
            errorCode: error.code,
            errorMessage: error.message,
            response: {
                message: error.response?.data.message,
            },
        };

        console.log(data);

        return { ok: false };
    }
}
