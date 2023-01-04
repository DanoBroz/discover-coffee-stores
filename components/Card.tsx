import Image from "next/image";
import Link from "next/link";

export default function Card({
    name,
    imageUrl,
    href,
}: {
    name: string;
    imageUrl: string;
    href: string;
}) {
    return (
        <Link href={href} legacyBehavior>
            <a>
                <h2>{name}</h2>
                <Image
                    src={imageUrl}
                    width={260}
                    height={160}
                    alt={`coffee store - ${name}`}
                />
            </a>
        </Link>
    );
}
