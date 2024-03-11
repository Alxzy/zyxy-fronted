import Index from "../pages/IndexPage.vue";
import User from "../pages/UserPage.vue";
import Message from "../pages/MessagePage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import Team from "../pages/TeamPage.vue";
import Search from "../pages/SearchPage.vue";
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/search', component: Search },
    { path: '/user', component: User },
    { path: '/message', component: Message },
    { path: '/user/edit', component: UserEdit },
]

export default routes;