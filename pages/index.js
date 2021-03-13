import Head from 'next/head'

import { fetchEntries } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Post from '@components/Post'

export default function Home({ posts, cta }) {

  console.log('posts = ', posts)
  console.log('cta = ', cta)

  return (
    <div className="container">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="cta">
        {cta.map((c) => {
          return (
            <div>
            <div>{c.title}</div>
            <div>{c.moreText}</div>
            </div>)
        })}
        </div>
        <div className="posts">
          {posts.map((p) => {
            return <Post key={p?.date} date={p?.date} image={p?.image?.fields} title={p?.title} />
          })}

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .posts {
          display: flex;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const entries = await fetchEntries()

  let posts = await entries.filter(function(item){
    return item.sys.contentType.sys.id === "post";
  });

  posts = posts.map((m) => {
    return m.fields
  })

  let cta = await entries.filter(function(item){
    return item.sys.contentType.sys.id === "callToAction";
  });

  cta = cta.map((m) => {
    return m.fields
  })

  return {
    props: {
      posts,
      cta
    },
  }
}
