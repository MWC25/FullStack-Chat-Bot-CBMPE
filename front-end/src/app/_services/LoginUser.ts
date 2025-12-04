'use client';
import api, { setAuthToken } from '../../../lib/axiosClient';

type LoginErrorData = {
    errorStatusCode: number | null;
    errorCode: string | null;
    errorMessage: string | null;
    response: { message: string | null };
};

type LoginResult =
    | { ok: true; data: any }
    | { ok: false; data: LoginErrorData };

export async function loginUser(
    registration: string,
    password: string
): Promise<LoginResult> {
    try {
        const res = await api.post('/api/login', {
            registration,
            password,
        });

        console.log('LOGIN RESPONSE =>', res.data);

        const { token } = res.data; 
        if (typeof window !== 'undefined' && token) {
            localStorage.setItem('accessToken', token); 
        }

        return { ok: !!token, data: res.data };
    } catch (error: any) {
        console.log('LOGIN ERROR =>', {
            status: error?.response?.status,
            data: error?.response?.data,
            message: error?.message,
        });

        const errorData: LoginErrorData = {
            errorStatusCode: error?.response?.status ?? null,
            errorCode: error?.code ?? null,
            errorMessage: error?.message ?? null,
            response: {
                message:
                    error?.response?.data?.message ?? 'Erro ao realizar login',
            },
        };

        return { ok: false, data: errorData };
    }
}