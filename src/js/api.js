const baseUrl = 'https://todo-app-back.herokuapp.com';
const routes = {
    auth: {
        login: `${baseUrl}/login`,
        checkAuth: `${baseUrl}/me`,
        register: `${baseUrl}/register`,
    },

    todos: {
        create: `${baseUrl}/todos`,
        read: `${baseUrl}/todos`,
        update: (id) => `${baseUrl}/todos/${id}`,
        delete: (id) => `${baseUrl}/todos/${id}`,
    },
}

export default routes;