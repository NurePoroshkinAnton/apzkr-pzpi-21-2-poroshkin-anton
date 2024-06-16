import styles from "./styles.module.scss"

type PageTitleProps = {
    title: string
}

export default function PageTitle({ title }: PageTitleProps) {
    return <h1 className={styles["page-title"]}>{title}</h1>
}

