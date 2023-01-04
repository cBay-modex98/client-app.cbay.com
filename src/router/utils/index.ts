import { routes } from "~/router";
import { app_join } from "~/utils";

interface IRoute {
    name?: string;
    path?: string;
    children?: IRoute[];
}

const raw_resolve = (name: string, items: IRoute[]): string[] => {
    for (let route of items) {
        let _path: string[] = [];

        if ("path" in route) {
            _path.push(route.path!);
        }

        if ("name" in route) {
            if (route.name === name) {
                return _path.length ? _path : [""];
            }
        }

        if ("children" in route) {
            const _children_path = raw_resolve(name, route.children!);
            if (_children_path.length) return [..._path, ..._children_path];
        }
    }

    return [];
};

export const resolve = (name: Parameters<typeof raw_resolve>[0]) => {
    return app_join(raw_resolve(name, routes));
};

// ************************************************************************

type TPayload = Record<string, string>;

export interface ITo {
    name: string;
    params?: TPayload;
    query?: TPayload;
    hash?: string | undefined;
}

export const resolve_payload = (payload: ITo) => {
    const { name, hash, params, query } = payload;

    let _path = resolve(name);

    if (params) {
        Object.entries(params).forEach(([key, val]) => {
            _path = _path.replace(`:${key}`, val);
        });
    }

    if (query) {
        const _query = new URLSearchParams(query).toString();
        if (query) {
            _path += `?${_query}`;
        }
    }

    if (hash) _path += hash;

    return _path;
};
