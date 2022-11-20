import { /* useRef */ useState } from "react";
import styles from "~/assets/scss/components/text-input.module.scss";
type InputProps = React.ComponentPropsWithoutRef<"input">;

interface Props extends InputProps {
    label?: React.ReactNode;
    type?: "text" | "password" | "email" | "search";
    name?: string;
    error?: string;
}

const TextInput: React.FC<Props> = ({ id, label, type, name, error, placeholder, ...props }) => {
    // const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    console.log(value);

    const _label = label ? (
        <label className={styles.label} htmlFor={id}>
            {label}
        </label>
    ) : null;
    const _error = error ? <small>{error}</small> : null;

    return (
        <div className={styles.root}>
            {_label}
            <span className={`${styles.input} ${value ? styles.filled : ""}`} data-label={label ?? placeholder}>
                <input onInput={(e) => setValue(e.currentTarget.value)} id={id} type={type} name={name} placeholder={placeholder} {...props} />
            </span>
            {_error}
        </div>
    );
};

export default TextInput;