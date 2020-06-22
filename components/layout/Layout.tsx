import Head from 'next/head'
import * as React from 'react'
import css from './Layout.module.scss'
//import { links } from './links'

export const Layout = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div className={css.layout}>
      <Head>
        <title>{props.title} - Brenden's Adventure</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      {/* <div className={css.header}>
        {l.map(links, (c, cIdx) => (
          <React.Fragment key={cIdx}>
            {cIdx !== 0 && <> | </>}
            <Link href={c[0]}>
              <a>{c[1]}</a>
            </Link>{' '}
          </React.Fragment>
        ))}
      </div> */}

      <h2>
        Brendens Adventure! <small>a short romp by Brenden and Stevie</small>
      </h2>
      <div style={{ padding: 50, maxWidth: 1000 }}>{props.children}</div>

      <footer>
        {/* <hr /> */}
        <span>
          &copy; 2017-2020 Stevie Bushman and Brenden &mdash;
          stevie@steviebushman.com
        </span>
      </footer>
    </div>
  )
}
