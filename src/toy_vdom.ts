export type VNode = {
    tag: string;
    attrs: Record<string, string>;
    children: (VNode | string)[];
} | string;

export function render(vnode: VNode, container: HTMLElement) {
    if (typeof vnode === 'string') {
        container.appendChild(document.createTextNode(vnode));
        return;
    }

    const el = document.createElement(vnode.tag);
    for (const [key, value] of Object.entries(vnode.attrs)) {
        el.setAttribute(key, value);
    }

    for (const child of vnode.children) {
        render(child, el);
    }

    container.appendChild(el);
}
