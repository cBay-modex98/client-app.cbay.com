import { useCallback, useEffect, useState, type DependencyList } from "react";
import { getNestedValue, recursionProxy, type NAMESPACE_PAYLOAD, type DICTIONARY_NAMESPACES, $dictionary, useLanguage } from "~/i18n";

const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

const useTranslate = (name_space: DICTIONARY_NAMESPACES, dependencies: DependencyList = []) => {
    const { language } = useLanguage();

    const [namespace_payload, set] = useState($dictionary.get(name_space));

    useEffect(() => {
        $dictionary.load(name_space).then((v) => set(v));
    }, [name_space, language, ...dependencies]);

    const i18n = useCallback(
        (dictionary_path: string, fallback: string = "_") => {
            if (!namespace_payload) return fallback;

            const _translation = getNestedValue(namespace_payload, dictionary_path.split("."));

            return _translation || fallback;
        },
        [namespace_payload]
    );

    const $t = useCallback((v: (proxied_payload: any) => any) => `${v(recursionProxy<NAMESPACE_PAYLOAD>(namespace_payload ?? {}, FALLBACK_MESSAGE))}`, [namespace_payload]);

    return {
        i18n,
        $t,
    };
};

export default useTranslate;
