import React from 'react'
import { useFela } from 'react-fela'

export default function DocsLayout ({ children }) {
  const { css } = useFela()

  const list = css({
    fontSize: '0.92rem',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 10px',
    '> li > a': {
      color: '#fff'
    }
  })

  return (
    <div
      className={css({
        color: '#fff',
        padding: '10px',
        position: 'relative',

        '@media (min-width: 600px)': {
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gridGap: '20px'
        }
      })}
    >
      <nav
        className={css({
          '@media (max-width: 599px)': {
            marginBottom: '30px'
          }
        })}
      >
        <ul className={list}>
          <li>
            <a href='#getting-started'>Getting started</a>
          </li>

          <li>
            <a href='#global-configuration'>Global configuration</a>
          </li>

          <li>
            <a href='#pages'>Pages</a>
          </li>

          <li>
            <a href='#components'>Components</a>
          </li>

          <li>
            <a href='#core-files'>Core files</a>

            <ul className={list}>
              <li>
                <a href='#buildjs'><code>build.js</code></a>
              </li>

              <li>
                <a href='#entryclientjs'><code>entry.client.js</code></a>
              </li>

              <li>
                <a href='#entryprerenderjs'><code>entry.prerender.js</code></a>
              </li>

              <li>
                <a href='#hydration_helpersjs'><code>hydration_helpers.js</code></a>

                <ul className={list}>
                  <li>
                    <a href='#asisland'><code>asIsland</code></a>
                  </li>

                  <li>
                    <a href='#hydrateislands'><code>hydrateIslands</code></a>
                  </li>

                  <li>
                    <a href='#example-usage-of-hydration-helpers'>Example usage</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div>{children}</div>
    </div>
  )
}
