export const queryKeys = {
    meal: {
        get: (id: string) => ['meal', 'get', id],
        create: ['meal', 'create'],
        list: ['meal', 'list'],
        listWithFilers: (filters: string[]) => ['meal', 'list', ...filters]
    },
    user: {
        me: ['user', 'me']
    }
} 