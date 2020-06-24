import VueRouter from "vue-router";
import Main from "../../components/MainPage";
import Change from "../../components/ChangePage";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: Main,
            meta: {title: 'Main page'}
        },
        {
            path: '/change/:id',
            component: Change,
            meta: {title: 'Editing Todo'}
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;