import {useState,useEffect} from "react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Story({story,pos}){

    const [rov,setRov] = useState(false)
    const [referer, setReferer] = useState(false)

    const imageWidth = 500
    const router = useRouter()


    useEffect(() => {
        if(router.query.hasOwnProperty('rov')){
            setRov(router.query.rov)
        }
    },[]);

    return (
            <article className={styles.article}>
                <Link href={"/"+story.slug.replace(/Gratis-ting-og-vareprover\//,"")}>•</Link>
                <a rel={"noreferrer noopener"} target={"_blank"} href={"https://gjerrigknark.com/"+(story.slug?story.slug:story._id)+"/besok?rov=velkomstgaver-pos"+pos+((router.query.hasOwnProperty('rov'))?"-"+router.query.rov:"")}>
                    <h1>{story.title}</h1>
                    {story.images && story.images.main_image && story.images.main_image_aspect_ratio &&
                        <div className={styles.imageWrapper}>
                            <Image
                                src={story.images.main_image}
                                width={imageWidth}
                                height={Math.round(imageWidth/parseFloat(story.images.main_image_aspect_ratio))}
                            />
                        </div>
                    }
                    <div>
                        <button>Bestill nå &raquo;</button>
                    </div>
                </a>
            </article>
    )
}