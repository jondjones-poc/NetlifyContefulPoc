const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {

  const response = await client.getContentTypes()
  console.log('content types = ', response?.items)

  const entries = await client.getEntries()
  console.log('entries = ', response?.items)

  if (entries.items)
    return entries.items

  console.log(`Error getting Entries for ${contentType.name}.`)
}

export default { fetchEntries }
