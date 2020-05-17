import { pathify } from "./pathify"
import slugify from "slug"

export const linkify = (value) => {
  return (
    pathify("tag", slugify(value, { lower: true }))
  )
}
