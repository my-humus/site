import { pathify } from "gatsby-plugin-tags/internals"
import slugify from "slug"

export const linkify = (value) => {
  return (
    pathify("tag", slugify(value, { lower: true }))
  )
}
