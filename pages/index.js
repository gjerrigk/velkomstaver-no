import {useState,useEffect} from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home({stories}) {
  const [alreadySubmitted,setAlreadySubmitted] = useState(false)
  const [rov,setRov] = useState(false)
  const [referer, setReferer] = useState(false)

  const [submitting,setSubmitting] = useState(false)
  const [msg,setMsg] = useState(false)
  const [error,setError] = useState(false)
  const [contactMethod,setContactMethod] = useState("")
  const imageWidth = 500
  const router = useRouter()

  let pos = 0


  useEffect(() => {
    if(router.query.hasOwnProperty('rov')){
      setRov(router.query.rov)
    }
  },[]);


  const checkContactMethod = (inp) =>{
    setError(false);
    setMsg(false);

    if(inp && inp.length > 2){

      if(!inp.match(/^(|0047|\+47)(4|9)[0-9]{7}$/) && !/\S+@\S+\.\S+/.test(inp)){
        setError("Ugyldig mobilnr eller epost");
        return false;
      }
      else{
        return true;
      }
    }
    return false;
  }

  const updateContactMethod = (inp) => {
    setSubmitting(false);
    setContactMethod(inp);
    checkContactMethod(inp);
  }

  const submitContactMethod = () => {
    setMsg(false);

    let email = "";
    let phone = "";

    if(!contactMethod || contactMethod.length == 0){
      setError("Du må angi et mobilnr eller en epost");
    }
    else if(alreadySubmitted){
      setError("Du er allerede påmeldt. Last siden på nytt for å bruke annet mobilnr eller epost.")
    }
    else if(checkContactMethod(contactMethod)){

      let userIdentification;

      if(/\S+@\S+\.\S+/.test(contactMethod)){
        email = contactMethod.toLowerCase();
        userIdentification = { user_email: email };
      }
      else{
        phone = contactMethod
        if(phone.match(/^\+[0-9]{10}/)){
          phone = "00"+phone.substring(1)
        }
        else if(phone.match(/^00[0-9]{10}/)){
          phone = phone
        }
        else{
          phone = "0047"+phone;
        }
        userIdentification = { user_phone_number: phone }
      }

      const options = {
        debug: false, 		// enable logs
      };

      // https://www.npmjs.com/package/react-snapchat-pixel
      // https://github.com/zsajjad/react-facebook-pixel/issues/65
      //const ReactPixel = require('react-snapchat-pixel');
      //ReactPixel.init('2882a6d4-168b-4c10-a738-93e434cd830c', userIdentification, options);

      // Snapchat
      snaptr('init', '2882a6d4-168b-4c10-a738-93e434cd830c', userIdentification);

      // Pinterest
      pintrk('track','signup', {lead_type: 'Velkomstgaver'});

      // Facebook
      fbq('track','Lead');

      // Tik Tok
      ttq.track('Subscribe');

      // Taboola
      _tfa.push({notify: 'event', name: 'complete_registration', id: 1211453});

      // Adwords
      gtag('event', 'conversion', {
        'send_to': 'AW-1068246437/OnBkCJLuh2sQpcuw_QM',
        'value': 1.0,
        'currency': 'NOK'
      });



      setError(false);
      setSubmitting(true);

      let formData = new FormData();
      formData.append('site', 'velkomstgaver.no');

      if(email.length > 0)
        formData.append('email', email);

      if(phone.length > 0)
        formData.append('phone', phone);

      if(rov !== false){
        formData.append('rov', rov);
      }

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(`https://app.gjerrigknark.com/subscribe/?action=subscribe`,formData,config)
          .then(res => {
            setSubmitting(false);
            setMsg("Du vil nå motta varslinger!");
            setAlreadySubmitted(true)
            snaptr('track', 'SIGN_UP');
          })
          .catch((err) =>{
            setMsg(false);
            setSubmitting(false);
            setError("En feil oppstod - prøv igjen senere")
          })
    }
    else{
      setError("Ugyldig mobilnr eller epost");
    }
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Nye velkomstgaver</title>
          <meta name="description" content="Få tips om nye velkomstgaver du kan motta." />
          <meta name="facebook-domain-verification" content="kg3hicif9rh2gk4tue8xfoaz1vlfun" />
          <link rel="icon" href="/favicon.ico" />

          {/* Snapchat tracking init */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                    r.src=n;var u=t.getElementsByTagName(s)[0];
                    u.parentNode.insertBefore(r,u);})(window,document,
                    'https://sc-static.net/scevent.min.js');
                  `,
              }}
          />

          {/* Pinterest tracking init */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                    !function(e){if(!window.pintrk){window.pintrk = function () {
                    window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                    n=window.pintrk;n.queue=[],n.version="3.0";var
                    t=document.createElement("script");t.async=!0,t.src=e;var
                    r=document.getElementsByTagName("script")[0];
                    r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                    pintrk('load', '2614390234178');
                    pintrk('page');
                  `,
              }}
          />

          {/* Facebook tracking init */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '319104862011061');
                    fbq('track', 'PageView');
                  `,
              }}
          />

          {/* Taboola tracking init */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                   window._tfa = window._tfa || [];
                    window._tfa.push({notify: 'event', name: 'page_view', id: 1211453});
                    !function (t, f, a, x) {
                        if (!document.getElementById(x)) {
                            t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                        }
                    }(document.createElement('script'),
                        document.getElementsByTagName('script')[0],
                        '//cdn.taboola.com/libtrc/unip/1211453/tfa.js',
                        'tb_tfa_script');
                        
                    _tfa.push({notify: 'event', name: 'page_view',"item-url":'https://velkomstgaver.no'});
                  `,
              }}
          />

          {/* TikTok tracking init */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                !function (w, d, t) {
                    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                    ttq.load('C6HN2G0VMNUOMCA118LG');
                    ttq.page();
                }(window, document, 'ttq');
                  `,
              }}
          />

          {/* Adwords tracking init */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1068246437"/>
          <script
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                    
                      gtag('config', 'AW-1068246437');
                  `,
              }}
          />

        </Head>

        <main className={styles.main}>
          {/*<h1>VELKOMSTGAVER</h1>
        <h2>fra Gjerrigknark.com</h2>*/}

          <Image
              src={"/velkomstgaver.png?v=0002"}
              layout={"intrinsic"}
              width={480}
              height={179}
          />

          <form className={styles.form}>
            <input value={contactMethod} onBlur={(e) => checkContactMethod(e.target.value)} onChange={(e) => updateContactMethod(e.target.value)} placeholder={"Mobilnr. eller epostadresse"}/>
            <button onClick={(e) => {e.preventDefault();submitContactMethod()}}>Få gratis varsling om nye tips&nbsp;
              <span className={submitting === true?styles.arrowQuick:msg!==false?styles.arrowStop:styles.arrow}>&raquo;</span></button>
          </form>

          {error !== false &&
              <div className={styles.error}>{error}</div>
          }
          {msg !== false &&
              <div className={styles.message}>{msg}</div>
          }


          <div className={styles.description}>
            Få tilsendt tips om nye velkomstgaver jevnlig - alt du trenger å gjøre er å legge inn mobilnummeret ditt eller epostadressen din over!
          </div>

          <div className={styles.stories}>
            <h2>Aktuelle velkomstgaver:</h2>

            {stories.map((story,i) => {
              if(router.query.hasOwnProperty('id') && router.query.id === story.id){
                pos++
                return(
                    <article key={i} className={styles.article}>
                      <a rel={"noreferrer noopener"} target={"_blank"} href={"https://gjerrigknark.com/"+story.slug+"/besok?rov=velkomstgaver-pos"+pos+((router.query.hasOwnProperty('rov'))?"-"+router.query.rov:"")}>
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
            })}

            {stories.map((story,i) => {
              if(!router.query.hasOwnProperty('id') || (router.query.hasOwnProperty('id') && router.query.id !== story.id)) {
                pos++
                return (
                    <article key={i} className={styles.article}>
                      <a rel={"noreferrer noopener"} target={"_blank"}
                         href={"https://gjerrigknark.com/" + story.slug + "/besok?rov=velkomstgaver-pos" + pos + ((router.query.hasOwnProperty('rov')) ? "-" + router.query.rov : "")}>
                        <h1>{story.title}</h1>
                        {story.images && story.images.main_image && story.images.main_image_aspect_ratio &&
                            <div className={styles.imageWrapper}>
                              <Image
                                  src={story.images.main_image}
                                  width={imageWidth}
                                  height={Math.round(imageWidth / parseFloat(story.images.main_image_aspect_ratio))}
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

  let res = await fetch('https://app.gjerrigknark.com/data/gjerrigknark/insidertips.php?sort=random')
  const stories = await res.json()


  return {
    props: {
      stories
    },
    revalidate: 24*3600,
  }
}