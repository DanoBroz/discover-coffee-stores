import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";

import styles from "./Card.module.css";
import type { Key } from "react";

interface CardProps {
    name: string;
    imageUrl: string;
    href: string;
    key: Key | null | undefined;
}

export default function Card(props: CardProps) {
    const { name, imageUrl, href, key } = props;

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
