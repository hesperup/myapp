
import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';

const pinia = createPinia();
export default pinia;

export { useAppStore, useUserStore };