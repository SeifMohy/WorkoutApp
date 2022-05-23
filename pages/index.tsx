import type { NextPage } from 'next'
import Layout from "../components/layout"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
    <div className="text-3xl font-bold underline">
      Hello World!!
    </div>
    </Layout>
  )
}

export default Home
