import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";

import styles from "./Card.module.css";

interface CardProps {
    key: string;
    name: string;
    imageUrl: string;
    href: string;
}

export default function Card(props: CardProps) {
    const { key, name, imageUrl, href } = props;

    return (
        <Link key={key} href={href} legacyBehavior>
            <a className={styles.cardLink}>
                <div className={classnames("glass", styles.container)}>
                    <div className={styles.cardHeaderWrapper}>
                        <h2 className={styles.cardHeader}>{name}</h2>
                    </div>
                    <div className={styles.cardImageWrapper}>
                        <Image
                            className={styles.cardImage}
                            src={imageUrl}
                            width={260}
                            height={160}
                            alt={`coffee store - ${name}`}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </a>
        </Link>
    );
}
