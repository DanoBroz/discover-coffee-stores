import Head from "next/head";
import { useRouter } from "next/router";

export default function Dynamic() {
    const {
        query: { id },
    } = useRouter();

    return (
        <>
            <Head>
                <title>{id}</title>
            </Head>
            <div>
                <h1>Dynamic page: {id}</h1>
            </div>
        </>
    );
}
