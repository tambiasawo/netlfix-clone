import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function Plans() {
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon. co" />
      </Head>

      <header>
        {' '}
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
      </header>
    </div>
  )
}

export default Plans
