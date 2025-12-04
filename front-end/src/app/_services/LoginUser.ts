'use client';
import api, { setAuthToken } from '../../../lib/axiosClient';

type LoginErrorData = {
    errorStatusCode: number | null;
    errorCode: string | null;
    errorMessage: string | null;
    response: {
        message: string | null;
    };
};

type LoginResult =
    | { ok: true; data: any }
    | { ok: false; data: LoginErrorData };

export async function loginUser(registration: string, password: string): Promise<LoginResult> {
    try {
        const res = await api.post('/api/login', {
            registration,
            password,
        });

        const data = res.data;
        console.log('LOGIN RESPONSE =>', data);

        // ajusta o nome aqui se a API mandar `access_token`
        const token = data.accessToken ?? data.access_token;

        if (typeof window !== 'undefined' && token) {
            localStorage.setItem('accessToken', token);

            if (data.refreshToken ?? data.refresh_token) {
                localStorage.setItem('refreshToken', data.refreshToken ?? data.refresh_token);
            }

            setAuthToken(token);
        }

        return { ok: !!token, data };
    } catch (error: any) {
        console.error('LOGIN ERROR RAW =>', error);

        const errorData: LoginErrorData = {
            errorStatusCode: error?.response?.status ?? null,
            errorCode: error?.code ?? null,
            errorMessage: error?.message ?? null,
            response: {
                message: error?.response?.data?.message ?? 'Erro ao realizar login',
            },
        };

        console.log('LOGIN ERROR PARSED =>', errorData);

        return { ok: false, data: errorData };
    }
}
