import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import { pathify } from "./pathify"

import "../scss/utils/_paginator.scss"

export const ellipsis = upper => {
  return (
    <li key={"page-" + (upper ? "ellipsis-upper" : "ellipsis-lower")}>
      <span>...</span>
    </li>
  )
}

export const item = (context, page, root) => {
  let link = page > 1 ? page : ""
  let slug = context.slug ? context.slug : "blog"
  let path = ""

  if (root) {
    path = pathify(root, slug, link)
  } else {
    path = pathify(slug, link)
  }

  return (
    <li key={"page-" + page}>
      <Link
        to={path}
        className={classNames({
          current: context.currentPage === page
        })}
      >
        {page}
      </Link>
    </li>
  )
}

export const paginate = (context, root) => {
  let items = []

  if (context.numPages > 1) {
    items.push(item(context, 1, root))

    if (context.currentPage > 3) {
      items.push(ellipsis(false))
    }
  }

  for (let i = 0; i < context.numPages; i++) {
    let page = i + 1

    if (
      page !== 1 &&
      page !== context.numPages &&
      page < context.currentPage + 2 && page > context.currentPage - 2
    ) {
      items.push(item(context, page, root))
    }
  }

  if (context.numPages > 1) {
    if (context.currentPage < context.numPages - 2) {
      items.push(ellipsis(true))
    }

    items.push(item(context, context.numPages, root))
  }

  return items
}

export const navigator = (context, root) => {
  if (context.numPages > 1) {
    return (
      <nav className="paginator-nav">
        <ul>{paginate(context, root)}</ul>
      </nav>
    )
  } else {
    return null
  }
}
