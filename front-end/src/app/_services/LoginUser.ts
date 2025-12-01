
import api, { setAuthToken } from '../../../lib/axiosClient';

export async function loginUser(
    registration: string,
    password: string,
    expireInMin: number = 1
) {
    const instant = new Date();
    const expireDate = new Date(
        instant.getTime() + expireInMin * 60 * 1000
    ).toISOString();
    try {
        const res = await api.post('/api/login', {
            registration,
            password,
            expireInMin,
        });

        const data = res.data;

        if (data.accessToken) {
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('expireDate', expireDate);
            setAuthToken(data.accessToken);
        }

        return { ok: true, data, expireDate };
    } catch (error: any) {

        const data = {
            errorStatusCode: error.status,
            errorCode: error.code,
            errorMessage: error.message,
            response: {
                message: error.response.data.message,
            },
        };

        console.log(data)

        return { ok: false, data };
    }
}
