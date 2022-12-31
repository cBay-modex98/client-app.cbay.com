export const scheduleTask = (job: Parameters<typeof setTimeout>[0], tm = 0) => {
    // queue Macro Task, you can queue a Micro Task using the api queueMicrotask
    return setTimeout(job, tm);
};

// export const catchErr = (fn: Tfunction, catcher: (e: unknown) => any) => {
//     try {
//         return fn();
//     } catch (e: unknown) {
//         return catcher(e);
//     }
// };

export const fail = <T extends string>(msg: T) => {
    throw Error(msg);
};

export const trimChar = (payload: string, target: string): string => {
    if (!payload) return payload;

    if (payload.startsWith(target)) return trimChar(payload.slice(1, payload.length), target);

    if (payload.endsWith(target)) return trimChar(payload.slice(0, payload.length - 1), target);

    return payload;
};

export const app_join = (payload: string[]) => {
    return payload
        .filter((v) => !!v)
        .map((v) => trimChar(v, "/"))
        .join("/");
};

export const sleep = <T>(time: number = 1000, resolve_to?: T) => {
    return new Promise<T>((resolve) => {
        const _resolve = resolve_to === undefined ? resolve : () => resolve(resolve_to);

        // @ts-ignore
        scheduleTask(_resolve, time);
    });
};

export const timeOut = () => {
    let t: NodeJS.Timeout | undefined;

    const set = (fn: Parameters<typeof setTimeout>[0], time = 0) => {
        t = setTimeout(fn, time);
    };

    const clear = () => {
        if (t == null) {
            clearTimeout(t);
            t = undefined;
        }
    };

    const reset = (fn: Parameters<typeof setTimeout>[0], time = 0) => {
        clear();
        set(fn, time);
    };

    return { set, clear, reset };
};

export { close, open } from "~/utils/full-screen";
export { default as logger } from "~/utils/logger";
