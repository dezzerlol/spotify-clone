import React from 'react'
import Head from 'next/head'

interface ISeo {
  title: string
  ogtitle?: string
  description?: string
  ogdescription?: string
  type?: string
  url?: string
  image?: string
}

const SEO = ({ title, ogtitle, description, ogdescription, type, url, image }: ISeo) => (
  <Head>
    <title>{title}</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
    <meta name='description' content={description} />
    <meta property='og:site_name' content='Spotify' />
    {ogtitle && <meta property='og:title' content={ogtitle} />}
    {ogdescription && <meta property='og:description' content={ogdescription} />}
    {url && <meta property='og:url' content={url} />}
    {type && <meta property='og:type' content={type} />}
    {image && <meta property='og:image' content={image} />}
    <link rel='icon' href='/spotify-favicon.png' />
    <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
  </Head>
)

export default SEO
