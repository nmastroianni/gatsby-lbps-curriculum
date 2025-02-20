import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { HiChevronRight } from 'react-icons/hi'
import { getBreadcrumbs } from '../../../utils'

const Breadcrumb = ({ pathname, contentArea }) => {
  const { crumbs, pieces } = getBreadcrumbs(pathname)
  const { i18n, t } = useI18next()
  if (i18n.language !== 'en') {
    crumbs.shift()
    pieces.shift()
  }
  console.log(contentArea)
  crumbs.unshift('')
  pieces.unshift('')
  return (
    <>
      <nav className="max-w-screen-2xl px-3 sm:px-6 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 mx-auto">
        <ul className="flex my-4 text-xs md:text-lg lg:text-xl text-emerald-900 dark:text-emerald-200 font-light">
          {crumbs.map((crumb, i) => {
            if (i === 0) {
              return (
                <li
                  key="home"
                  className="hover:text-emerald-700 dark:hover:text-emerald-100"
                >
                  <Link to="/" className="capitalize">
                    {t('home')}
                  </Link>
                  <HiChevronRight className="inline mx-1 sm:mx-4 w-4 h-4 text-emerald-900 dark:text-emerald-200" />
                </li>
              )
            }
            return (
              <li
                key={crumb}
                className="hover:text-emerald-700 dark:hover:text-emerald-100"
              >
                <Link to={`/${crumb}/`} className="capitalize">
                  {i + 1 === crumbs.length && contentArea
                    ? t(contentArea)
                    : t(pieces[i])}
                </Link>
                {i < crumbs.length - 1 && (
                  <HiChevronRight className="inline mx-1 sm:mx-4 w-4 h-4 text-emerald-900 dark:text-emerald-200" />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

Breadcrumb.propTypes = {
  pathname: PropTypes.string.isRequired,
  contentArea: PropTypes.string,
}

export default Breadcrumb
