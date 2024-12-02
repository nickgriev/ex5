import { render, VNode } from './toy_vdom';

type Route = {
    path: string;
    component: () => Promise<VNode>;
};

export class Router {
    private routes: Route[] = [];

    add(path: string, component: () => Promise<VNode>) {
        this.routes.push({ path, component });
        return this;
    }

    async handleRoute() {
        const currentPath = window.location.pathname;
        const route = this.routes.find(route => route.path === currentPath);

        if (!route) {
            throw new Error(`No route found for path: ${currentPath}`);
        }

        return await route.component();
    }

    listen(container: HTMLElement) {
        window.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const url = new URL(anchor.href);
                window.history.pushState({}, '', url.pathname);
                this.handleRoute()
                    .then(component => {
                        container.innerHTML = '';
                        render(component, container);
                    })
                    .catch(console.error);
            }
        });

        window.addEventListener('popstate', () => {
            this.handleRoute()
                .then(component => {
                    container.innerHTML = '';
                    render(component, container);
                })
                .catch(console.error);
        });
    }
}