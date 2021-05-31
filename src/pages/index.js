import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ data, countries }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lowest Covid Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headersInfo}>
        <p>Latest Update: {data.Date.split('T')[0]}</p>
        <p>Countries Currently Less Than 5000 Confirmed Infections: {countries.length}</p>
      </div>
      <p className={styles.headersTitle}>Countries with Lowest Confirmed Covid Infections</p>
      <div className={styles.countriesWrapper}>
        {countries.map(country =>{
          return(
            <Link key={country.ID} href={"/" + country.Slug}><a>
            <div className={styles.countryItem}>
              <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country} />
              <p className={styles.countryTitle}>{country.Country} ({country.CountryCode})</p>
              <div className={styles.countryInfo}>
                <span className={styles.textInfo}>Confirmed <span className={styles.numbersInfo}>{country.TotalConfirmed}</span></span>
                <span className={styles.textInfo}>Deaths <span className={styles.numbersInfo}>{country.TotalDeaths}</span></span>
                <span className={styles.textInfo}>Recovered <span className={styles.numbersInfo}>{country.TotalRecovered}</span></span>
              </div>
            </div>
            </a></Link>
          )
        })}
      </div>
      <p className={styles.footer}>Website made by <a href="https://www.shanekeenan.dev" rel="follow" target="_blank" >Daddy Shane</a>.</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1)
  return {
    props: { data, countries }, // will be passed to the page component as props
  }
}