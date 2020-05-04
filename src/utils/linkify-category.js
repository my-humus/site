import { pathify } from "gatsby-plugin-categories/internals"
import slugify from "slug"

export const linkify = (value) => {
  return (
    pathify("category", slugify(value, { lower: true }))
  )
}
