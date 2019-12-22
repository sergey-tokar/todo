import Router from './js/services/router.js';
import StorageService from './js/services/storage.js';
import LoginPage from './js/pages/login-page.js';
import TodosPage from './js/pages/todos-page.js';

const router = new Router();

router.registerRoute({ route: '/', component: new LoginPage() });
router.registerRoute({ route: '/todos', component: new TodosPage(), checker: () => {
    const isAuthorized = !!StorageService.getAccessToken();
    if (!isAuthorized) {
        router.navigate('/');
        return false;
    }

    return true;
}});

const isAuthorized = !!StorageService.getAccessToken();
router.navigate(isAuthorized ? '/todos' : '/');
