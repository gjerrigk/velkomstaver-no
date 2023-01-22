import {useState,useEffect} from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Tracking from "../../components/tracking";
import SubmitForm from "../../components/submitForm";
import Story from "../../components/story";

export default function Page({story, stories}) {

    const [rov,setRov] = useState(false)
    const [referer, setReferer] = useState(false)

    const imageWidth = 500
    const router = useRouter()

    let pos = 0


    useEffect(() => {
        if(router.query.hasOwnProperty('rov')){
            setRov(router.query.rov)
        }
    },[]);


    if(!story){
        return(
            <>
                Feil
            </>
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{story.title} | Velkomstgaver.no</title>
                <meta name="description" content={story.short_description} />
                <link rel="icon" href="/favicon.ico" />
                <Tracking
                    path={(story.slug?story.slug:story._id)}
                />
            </Head>

            <main className={styles.main}>
                <div className={styles.mainStory}>
                    <a rel={"noreferrer noopener"} target={"_blank"} href={"https://gjerrigknark.com/"+(story.slug?story.slug:story._id)+"/besok?rov=velkomstgaver-pos-details"+((router.query.hasOwnProperty('rov'))?"-"+router.query.rov:"")}>
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
                            {story.short_description}
                        </div>
                        <div>
                            <button>Bestill nå &raquo;</button>
                        </div>
                    </a>
                </div>


                <SubmitForm/>

                <div className={styles.stories}>
                    <h2><span style={{fontStyle:'normal'}}>🎁</span> Aktuelle velkomstgaver:</h2>


                    {stories.map((story2,i) => {
                        if(story.id !== story2._id) {
                            pos++
                            return (
                                <Story
                                    story={story2}
                                    key={i}
                                    pos={pos}
                                />
                            )
                        }
                    })

                    }


                </div>

            </main>

            <footer className={styles.footer}>
                &copy; Gjerrigknark.com
            </footer>
        </div>
    )
}

export async function getStaticProps(context){

    const slug = context.params.page.join("/");

    let stories;
    let story;

    if(slug && slug.length > 0){

        try{
            // Story
            let res = await fetch('https://app.gjerrigknark.com/data/gjerrigknark/storyDetails.php?slug=' + 'Gratis-ting-og-vareprover/' + slug)
            story = await res.json();


            // Other stories
            res = await fetch('https://app.gjerrigknark.com/data/gjerrigknark/profitableStories.php?category=2')
            stories = await res.json()
        }
        catch (e){
            console.log("ERRRRRRORRR:")
            console.log(slug);
            return;
        }

        if(story.id){
            return {
                props: {
                    story,
                    stories
                },
                revalidate: 24*3600,
            }
        }
        else{
            return {
                redirect: {
                    /*permanent: true,*/
                    destination: "/"
                }
            }
        }
    }
}

export const getStaticPaths = async () => {
    // Other stories
    let res = await fetch('https://app.gjerrigknark.com/data/gjerrigknark/profitableStories.php?category=2')
    const stories = await res.json()

    let storyPaths = [];

    if(stories){
        storyPaths = stories.map(story => ({
                params: {page: story.slug?(story.slug.split("/")).slice(1,story.slug.split("/").length):[story._id]}
            })
        );
    }

    //console.log(storyPaths);

    return {
        paths: storyPaths,
        fallback: true
    }
}