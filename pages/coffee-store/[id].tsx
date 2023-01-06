import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { CoffeeStore } from "..";
import coffeeStoresData from "../../data/coffee-stores.json";

import styles from "../../styles/coffee-store.module.css";
import classnames from "classnames";

interface CoffeeStoreProps {
    coffeeStore: CoffeeStore;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            coffeeStore: coffeeStoresData.find(
                (coffeeStore) => coffeeStore.id === Number(params?.id)
            ),
        },
    };
};

export const getStaticPaths = async () => {
    const paths = coffeeStoresData.map((coffeeStore) => ({
        params: { id: coffeeStore.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
};

export default function CoffeeStore({ coffeeStore }: CoffeeStoreProps) {
    const { isFallback } = useRouter();
    const { address, name, neighbourhood, imgUrl } = coffeeStore;

    const handleUpvoteButton = () => {};

    if (isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.layout}>
                <Head>
                    <title>{name}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/" legacyBehavior>
                                <a>Back to home</a>
                            </Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <p className={styles.name}>{name}</p>
                        </div>
                        <Image
                            src={imgUrl}
                            width={600}
                            height={300}
                            alt={name}
                            className={styles.storeImg}
                        />
                    </div>
                    <div className={classnames("glass", styles.col2)}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/places.svg"
                                width="24"
                                height="24"
                                alt=""
                            />
                            <p className={styles.text}>{address}</p>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/nearMe.svg"
                                width="24"
                                height="24"
                                alt=""
                            />
                            <p className={styles.text}>{neighbourhood}</p>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/star.svg"
                                width="24"
                                height="24"
                                alt=""
                            />
                            <p className={styles.text}>1</p>
                        </div>

                        <button
                            className={styles.upvoteButton}
                            onClick={handleUpvoteButton}
                        >
                            Up vote!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
