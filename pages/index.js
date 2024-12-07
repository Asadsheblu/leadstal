// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import Script from 'next/script'
// import Banner from './Home/Banner'
// import Mission from './Home/Mission'
// import About from './Home/About'
// import Service from './Home/Service'
// import Review from './Home/Review'
// import Trust from './Home/Trust'
// import Counter from './Home/Counter'
// import Faq from './Home/Faq'
// import Contact from './Home/Contact'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>AsadTEch</title>
//         <meta name="Agency Website" content="Generated by AsadTEch" />
//  {/* bootstrap css cdn*/}
//         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
//       </Head>
//        {/* bootstrap js cdn*/}
//       <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></Script>
//       <main className={styles.main}>
//       <Banner/>
//       <Mission/>
//       <About/>
//       <Service/>
//       <Review/>
//       <Trust/>
//       <Counter/>
//       <Faq/>
//       <Contact/>

//         </main>
//     </div>
//   )
// }
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Email Catcher</h1>
      <Link href="/register">
        <span>Register</span>
      </Link>
    </div>
  );
};

export default Home;
