import './style.css'
import { render } from './toy_vdom';
import { Router } from './toy_router';

const app = document.querySelector<HTMLDivElement>('#app')!;
const router = new Router();

router
  .add('/', async () => {
    return await fetch('/component.json').then(response => response.json());
  })
  .add('/product', async () => {
    return await fetch('/product_page.json').then(res => res.json());
  });

router.handleRoute()
  .then(component => {
    render(component, app);
  })
  .catch(console.error);

router.listen(app);
