import cx from "classnames";
import styles from "./tag.module.scss";

const Tag = ({className, children, type, ...props}) => {
    return (
        <button type="submit" className={cx(styles.tag, {[styles.isSelected] : isSelected})}>{children}</button>
    )
};

export default Tag;