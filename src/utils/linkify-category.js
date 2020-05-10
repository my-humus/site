import { pathify } from "./pathify"
import slugify from "slug"

export const linkify = (value) => {
  return (
    pathify("category", slugify(value, { lower: true }))
  )
}
