import { AppLink, AppNavLink } from "~/router/components";
import styles from "~/assets/scss/modules/inner.module.scss";
import Icon from "~/components/icon";
import { Translate, DICTIONARY_NAMESPACES } from "~/i18n";

type RawProps = React.ComponentPropsWithoutRef<"nav">;

const nav = [
    { name: "Listings", icon: "listings", label: "sidebar.menu.listings" },
    { name: "Orders", icon: "orders", label: "sidebar.menu.orders" },
    { name: "Settings", icon: "settings", label: "sidebar.menu.settings" },
    { name: "Help", icon: "help", label: "sidebar.menu.help", disabled: true },
];

const classHandler = <T extends { isActive?: boolean; isPending?: boolean; disabled?: boolean }>({ isActive, isPending, disabled }: T) => {
    let payload = styles.navItem;

    if (isActive) payload += ` ${styles.active}`;
    if (isPending) payload += ` ${styles.pending}`;
    if (disabled) payload += ` ${styles.disabled}`;

    return payload;
};

const NavBar: React.FC<RawProps> = ({ ...props }) => {
    return (
        <Translate ns={DICTIONARY_NAMESPACES.INNER}>
            {({ i18n }) => (
                <nav {...props}>
                    <div className={styles.logo}>
                        <AppLink to={{ name: "Dashboard" }}>
                            <img src={"/cropped-logo.svg"} alt="logo" />
                        </AppLink>
                    </div>
                    <ul>
                        {nav.map(({ name, label, disabled, icon }, i) => (
                            <li key={i}>
                                {disabled ? (
                                    <span className={classHandler({ disabled, isActive: false })}>
                                        <Icon name={icon} disabled={disabled} />
                                        <p>{i18n(label)}</p>
                                    </span>
                                ) : (
                                    <AppNavLink className={classHandler} to={{ name }}>
                                        <Icon name={icon} /> <p>{i18n(label)}</p>
                                    </AppNavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.footer}>
                        <p>Copyright &#169;{new Date().getFullYear()} cBay</p>
                    </div>
                </nav>
            )}
        </Translate>
    );
};

export default NavBar;
