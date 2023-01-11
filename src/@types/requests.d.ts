declare module '@request-types' {
    interface IAuthSuccess {
        config: Object;
        data: {
            _type: string;
            _v: string;
            auth_type: string;
            customer_id: string;
            preferred_locale: string;
            visit_id: string
        },
        headers: {
            authorization: string;
            'cache-control': string;
            'content-type': string;
            expires: string;
            pragma: string;
            'x-dw-request-base-id': string
        },
        status: number;
        statusText: string;
    }

    interface IAuthError {
        code: string;
        config: Object;
        message: string;
        name: string;
        request: Object;
        stack: string;
    }
}