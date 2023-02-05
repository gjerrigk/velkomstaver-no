import {useState, useEffect, Fragment} from "react"
import axios from 'axios'
import Link from "next/link"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Tracking from "../components/tracking";
import SubmitForm from "../components/submitForm";
import Story from "../components/story";


export default function Home({stories}) {

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

  return (
      <div className={styles.container}>
        <Head>
          <title>Velkomstgaver.no: </title>
          <meta name="description" content="Få tips om nye velkomstgaver du kan motta." />
          <meta name="facebook-domain-verification" content="kg3hicif9rh2gk4tue8xfoaz1vlfun" />
          <link rel="icon" href="/favicon.ico" />

          <Tracking
              path={""}
          />

        </Head>

        <main className={styles.main}>

          <SubmitForm/>

          <div className={styles.stories}>
            <h2><span style={{fontStyle:'normal'}}>🎁</span> Aktuelle velkomstgaver:</h2>

            {stories.map((story2,i) => {
              if(router.query.hasOwnProperty('id') && router.query.id === story2._id){
                pos++
                return(
                    <Story
                        story={story2}
                        key={i}
                        pos={pos}
                    />
                )
              }
            })}

            {stories.map((story2,i) => {
              if(!router.query.hasOwnProperty('id') || (router.query.hasOwnProperty('id') && router.query.id !== story2.id)) {
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

export async function getStaticProps() {

  let res = await fetch('https://app.gjerrigknark.com/data/gjerrigknark/profitableStories.php?category=2')
  const stories = await res.json()


  return {
    props: {
      stories
    },
    revalidate: 24*3600,
  }
}