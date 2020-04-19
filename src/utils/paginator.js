import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

export const ellipsis = (upper) => {
  return (
    <li key={"page-" + (upper ? "ellipsis-upper" : "ellipsis-lower")}>
      <span>...</span>
    </li>
  )
}

export const item = (context, page) => {
  let link = page > 1 ? ("/" + page) : ""
  let slug = context.slug ? context.slug : "blog"

  return (
    <li key={"page-" + page}>
      <Link
        to={"/" + slug + link}
        className={classNames({
          current: context.currentPage === page
        })}
      >
        {page}
      </Link>
    </li>
  )
}

export const paginate = (context) => {
  let items = []

  if (context.numPages > 1) {
    items.push(item(context, 1))

    if (context.currentPage > 3) {
      items.push(ellipsis(false))
    }
  }

  for (let i = 0; i < context.numPages; i++) {
    let page = i + 1

    if (page !== 1 && page !== context.numPages && (page < (context.currentPage + 2) && page > (context.currentPage - 2))) {
      items.push(item(context, page))
    }
  }

  if (context.numPages > 1) {
    if (context.currentPage < (context.numPages - 2)) {
      items.push(ellipsis(true))
    }

    items.push(item(context, context.numPages))
  }

  return items
}

export const navigator = (context) => {
  if (context.numPages > 1) {
    return (
      <nav className="bottom-nav">
        <ul>
          {paginate(context)}
        </ul>
      </nav>
    )
  } else {
    return null
  }
}
