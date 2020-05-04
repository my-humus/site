import { pathify } from "gatsby-plugin-tags/internals"
import slugify from "slug"

export const linkify = (value) => {
  return (
    pathify("tags", slugify(value, { lower: true }))
  )
}
