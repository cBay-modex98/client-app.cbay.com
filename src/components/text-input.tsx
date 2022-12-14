import { /* useRef */ useState } from "react";
import styles from "~/assets/scss/components/text-input.module.scss";
type InputProps = React.ComponentPropsWithoutRef<"input">;

interface Props extends InputProps {
    label?: React.ReactNode;
    type?: "text" | "password" | "email" | "search";
    error?: string;
    errable?: boolean | 0 | 1;
}

const TextInput: React.FC<Props> = ({ errable = true, label, type = "text", error, placeholder, ...props }) => {
    const [value, setValue] = useState("");

    // const _error = <small className={`${styles.error} ${error ? "" : styles.empty}`}>{error || "."}</small>;
    const _error = <small className={`${styles.error} ${value ? "" : styles.empty}`}>{error || "."}</small>;

    return (
        <div className={styles.root}>
            <span className={`${styles.input} ${value ? styles.filled : ""}`} data-label={label ?? placeholder}>
                <input onInput={(e) => setValue(e.currentTarget.value)} type={type} placeholder={placeholder} {...props} />
            </span>
            {errable ? _error : null}
        </div>
    );
};

export default TextInput;
