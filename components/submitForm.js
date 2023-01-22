import {useState} from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function SubmitForm(){
    const [alreadySubmitted,setAlreadySubmitted] = useState(false)
    const [submitting,setSubmitting] = useState(false)
    const [msg,setMsg] = useState(false)
    const [error,setError] = useState(false)
    const [contactMethod,setContactMethod] = useState("")


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
        <>
            <Image
                src={"/velkomstgaver.png?v=0003"}
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
        </>
    )
}